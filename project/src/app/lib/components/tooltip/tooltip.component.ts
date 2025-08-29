import { ChangeDetectionStrategy, Component, computed, inject, input, model, ChangeDetectorRef, ElementRef, HostListener, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipPosition, TooltipConfig } from './tooltip.types';

/**
 * Token d'injection pour la configuration globale des tooltips
 */
export const TOOLTIP_CONFIG = new InjectionToken<Partial<TooltipConfig>>('TOOLTIP_CONFIG', {
  factory: () => ({
    variant: 'dark',
    position: 'top',
    showDelay: 200,
    hideDelay: 100,
    maxWidth: 200,
    defaultContent: 'TOOLTIP.DEFAULT.CONTENT'
  })
});

/**
 * Token d'injection pour les styles personnalisés
 */
export const TOOLTIP_STYLES = new InjectionToken<Record<string, string>[]>('TOOLTIP_STYLES', {
  factory: () => [{}]
});

@Component({
  selector: 'psh-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshTooltipComponent {
  private config = inject(TOOLTIP_CONFIG) as Required<TooltipConfig>;
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private styles = inject(TOOLTIP_STYLES, { optional: true }) ?? [];

  // Model inputs with defaults from config
  variant = model<'light' | 'dark'>(this.config.variant ?? 'dark');
  position = model<TooltipPosition>(this.config.position ?? 'top');
  showDelay = model(this.config.showDelay ?? 200);
  hideDelay = model(this.config.hideDelay ?? 100);
  maxWidth = model(this.config.maxWidth ?? 200);

  // Regular inputs
  content = input('Information contextuelle');

  // State
  isVisible = false;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  @HostListener('mouseenter')
  show(): void {
    // Clear any existing hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    // Only start show timeout if tooltip isn't already visible
    if (!this.isVisible && !this.showTimeout) {
      this.showTimeout = setTimeout(() => {
        this.isVisible = true;
        this.showTimeout = null;
        this.cdr.markForCheck();
      }, this.showDelay());
    }
  }

  @HostListener('mouseleave')
  hide(): void {
    // Clear any existing show timeout
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    // Only start hide timeout if tooltip is visible
    if (this.isVisible && !this.hideTimeout) {
      this.hideTimeout = setTimeout(() => {
        this.isVisible = false;
        this.hideTimeout = null;
        this.cdr.markForCheck();
      }, this.hideDelay());
    }
  }

  onFocusIn(): void {
    this.show();
  }

  onFocusOut(): void {
    this.hide();
  }

  ngOnDestroy(): void {
    // Clean up any pending timeouts
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  /**
   * Applique la configuration par défaut
   */
  static applyDefaults(component: PshTooltipComponent): void {
    const config = inject(TOOLTIP_CONFIG) as Required<TooltipConfig>;
    if (config.variant) component.variant.set(config.variant);
    if (config.position) component.position.set(config.position);
    if (config.showDelay !== undefined) component.showDelay.set(config.showDelay);
    if (config.hideDelay !== undefined) component.hideDelay.set(config.hideDelay);
    if (config.maxWidth !== undefined) component.maxWidth.set(config.maxWidth);
  }
}