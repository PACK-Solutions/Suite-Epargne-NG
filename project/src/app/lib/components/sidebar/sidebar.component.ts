import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  effect,
  OnDestroy,
  InjectionToken
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMode, SidebarPosition, SidebarConfig } from './sidebar.types';

export const SIDEBAR_CONFIG = new InjectionToken<Partial<SidebarConfig>>('SIDEBAR_CONFIG', {
  factory: () => ({
    mode: 'fixed',
    position: 'left',
    width: '250px',
    breakpoint: '768px'
  })
});

@Component({
  selector: 'psh-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshSidebarComponent implements OnDestroy {
  private config = inject(SIDEBAR_CONFIG);
  private elementRef = inject(ElementRef);
  private isDestroyed = signal(false);
  private focusedElementBeforeOpen: HTMLElement | null = null;

  // Model inputs with defaults from config
  open = model(false);
  mode = model<SidebarMode>(this.config.mode ?? 'fixed');
  position = model<SidebarPosition>(this.config.position ?? 'left');

  // Regular inputs
  width = input<string>(this.config.width ?? '250px');
  breakpoint = input<string>(this.config.breakpoint ?? '768px');

  // Outputs
  toggle = output<boolean>();

  // State
  private mobileSignal = signal(false);
  private overlayModeSignal = signal(false);

  // Computed values
  isMobile = computed(() => this.mobileSignal());
  isOverlayMode = computed(() => this.overlayModeSignal());
  effectiveMode = computed(() => 
    this.isMobile() ? 'overlay' : this.mode()
  );

  state = computed(() => this.getState());

  private getState(): string {
    if (this.isMobile()) return 'mobile';
    if (this.open()) return 'open';
    return this.mode();
  }

  constructor() {
    // Handle responsive behavior
    effect(() => {
      if (this.isDestroyed()) return;

      const mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint()})`);
      const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
        this.mobileSignal.set(e.matches);
        this.overlayModeSignal.set(e.matches || this.mode() === 'overlay');
      };

      // Initial check
      handleResize(mediaQuery);

      // Listen for changes
      const listener = (e: MediaQueryListEvent) => handleResize(e);
      mediaQuery.addEventListener('change', listener);

      return () => mediaQuery.removeEventListener('change', listener);
    });

    // Handle keyboard events
    effect(() => {
      if (this.isDestroyed()) return;

      if (this.open()) {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape' && this.isOverlayMode()) {
            this.closeSidebar();
          }
          if (event.key === 'Tab') {
            this.trapFocus(event);
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }
      return;
    });

    // Handle click outside
    effect(() => {
      if (this.isDestroyed()) return;

      if (this.open() && this.isOverlayMode()) {
        const handleClickOutside = (event: MouseEvent) => {
          if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeSidebar();
          }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }
      return;
    });
  }

  toggleSidebar(): void {
    if (this.isDestroyed()) return;

    const newState = !this.open();
    this.open.set(newState);
    this.toggle.emit(newState);

    if (newState) {
      this.focusedElementBeforeOpen = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        const firstFocusable = this.elementRef.nativeElement.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      });
    } else {
      if (this.focusedElementBeforeOpen) {
        this.focusedElementBeforeOpen.focus();
      }
    }
  }

  closeSidebar(): void {
    if (this.isDestroyed()) return;

    if (this.open()) {
      this.open.set(false);
      this.toggle.emit(false);
      if (this.focusedElementBeforeOpen) {
        this.focusedElementBeforeOpen.focus();
      }
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusableElements = this.elementRef.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed.set(true);
  }
}