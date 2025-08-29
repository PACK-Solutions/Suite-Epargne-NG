import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastType, ToastConfig } from './toast.types';
import { ToastService } from './toast.service';

/**
 * Token d'injection pour la configuration globale des toasts
 */
export const TOAST_CONFIG = new InjectionToken<Partial<ToastConfig>>('TOAST_CONFIG', {
  factory: () => ({
    position: 'top-right',
    duration: 5000,
    maxToasts: 5,
    pauseOnHover: true,
    showIcon: true,
    showCloseButton: true
  })
});

/**
 * Token d'injection pour les styles personnalisés
 */
export const TOAST_STYLES = new InjectionToken<Record<string, string>[]>('TOAST_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  private toastService = inject(ToastService);
  private config = inject(TOAST_CONFIG);
  private styles = inject(TOAST_STYLES, { optional: true }) ?? [];

  // Computed values
  toasts = computed(() => this.toastService.getToasts()());
  position = computed(() => this.toastService.getPosition()());
  customStyles = computed(() => Object.assign({}, ...this.styles));

  getPositionClass(): string {
    return `${this.position()}`;
  }

  handleDismiss(id: string | undefined): void {
    if (id) {
      this.toastService.remove(id);
    }
  }

  getDefaultIcon(type: ToastType): string {
    const icons: Record<ToastType, string> = {
      info: 'info',
      success: 'check-circle',
      warning: 'warning',
      danger: 'warning-octagon'
    };
    return icons[type] || 'info';
  }
}