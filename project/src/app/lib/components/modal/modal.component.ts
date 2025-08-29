import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  InjectionToken,
  Injectable,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshButtonComponent } from '../button/button.component';
import { ModalSize, ModalConfig } from './modal.types';

/**
 * Token d'injection pour la configuration globale des modales
 */
export const MODAL_CONFIG = new InjectionToken<Partial<ModalConfig>>('MODAL_CONFIG', {
  factory: () => ({
    size: 'medium',
    showClose: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    preventScroll: true,
    showFooter: true,
    dismissLabel: 'Close',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel'
  })
});

/**
 * Service pour la gestion des modales
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private config = inject(MODAL_CONFIG);
  private modalsSignal = signal<Set<string>>(new Set());

  /**
   * Récupère la configuration de la modale
   */
  getConfig(): Partial<ModalConfig> {
    return this.config;
  }

  /**
   * Génère un identifiant unique pour la modale
   */
  generateId(): string {
    return `modal-${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Ajoute une modale à la liste
   */
  register(id: string): void {
    this.modalsSignal.update(modals => {
      modals.add(id);
      return modals;
    });
  }

  /**
   * Supprime une modale de la liste
   */
  unregister(id: string): void {
    this.modalsSignal.update(modals => {
      modals.delete(id);
      return modals;
    });
  }

  /**
   * Vérifie si une modale est enregistrée
   */
  isRegistered(id: string): boolean {
    return this.modalsSignal().has(id);
  }

  /**
   * Récupère le nombre de modales actives
   */
  getActiveModalsCount(): number {
    return this.modalsSignal().size;
  }
}

@Component({
  selector: 'psh-modal',
  standalone: true,
  imports: [CommonModule, PshButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshModalComponent implements AfterViewInit, OnDestroy {
  private config = inject(MODAL_CONFIG);
  private modalService = inject(ModalService);
  private modalId = this.modalService.generateId();

  // Model inputs with defaults from config
  open = model(false);
  size = model<ModalSize>(this.config.size ?? 'medium');
  showClose = model(this.config.showClose ?? true);
  closeOnBackdrop = model(this.config.closeOnBackdrop ?? true);
  closeOnEscape = model(this.config.closeOnEscape ?? true);
  preventScroll = model(this.config.preventScroll ?? true);
  showFooter = model(this.config.showFooter ?? true);

  // Regular inputs
  title = input('Modal Title');
  dismissLabel = input(this.config.dismissLabel ?? 'Close');
  confirmLabel = input(this.config.confirmLabel ?? 'Confirm');
  cancelLabel = input(this.config.cancelLabel ?? 'Cancel');

  // Outputs
  closed = output<void>();
  confirmed = output<void>();

  private hasCustomFooterValue = false;
  private escapeHandler = (event: KeyboardEvent) => {
    if (this.closeOnEscape() && this.open() && event.key === 'Escape') {
      this.handleClose();
    }
  };

  // Computed values
  hasCustomFooter = computed(() => this.hasCustomFooterValue);

  state = computed(() => this.getState());

  private getState(): string {
    if (!this.open()) return 'closed';
    return 'open';
  }

  @ViewChild('modalContent', { static: false }) modalContent?: ElementRef;

  constructor() {
    // Gérer les changements d'état
    effect(() => {
      if (this.open()) {
        this.modalService.register(this.modalId);
        this.setupScrollLock();
        document.addEventListener('keydown', this.escapeHandler);
      } else {
        this.modalService.unregister(this.modalId);
        this.removeScrollLock();
        document.removeEventListener('keydown', this.escapeHandler);
      }
    });
  }

  ngAfterViewInit(): void {
    // Vérifier le footer personnalisé
    Promise.resolve().then(() => {
      if (this.modalContent) {
        this.hasCustomFooterValue =
          !!this.modalContent.nativeElement.querySelector('[modal-footer]');
      }
    });
  }

  handleClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  handleConfirm(): void {
    this.confirmed.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop() && event.target === event.currentTarget) {
      this.handleClose();
    }
  }

  private setupScrollLock(): void {
    if (this.preventScroll() && typeof window !== 'undefined') {
      // Calculate scrollbar width only once when opening
      if (
        !document.documentElement.style.getPropertyValue('--scrollbar-width')
      ) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty(
          '--scrollbar-width',
          `${scrollbarWidth}px`
        );
      }
      document.body.classList.add('modal-open');
    }
  }

  private removeScrollLock(): void {
    if (this.preventScroll() && typeof window !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  ngOnDestroy(): void {
    this.removeScrollLock();
    document.removeEventListener('keydown', this.escapeHandler);
    this.modalService.unregister(this.modalId);
  }
}