import { ChangeDetectionStrategy, Component, computed, input, model, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeSize, BadgeVariant, BadgePosition, BadgeDisplayType } from './badge.types';

// Default configuration
const DEFAULT_CONFIG = {
  variant: 'primary' as BadgeVariant,
  size: 'medium' as BadgeSize,
  displayType: 'text' as BadgeDisplayType,
  max: 99,
  showZero: false,
  position: 'top-right' as BadgePosition
};

@Component({
  selector: 'psh-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshBadgeComponent<T = number> {

  // Model inputs with defaults
  variant = model<BadgeVariant>(DEFAULT_CONFIG.variant);
  size = model<BadgeSize>(DEFAULT_CONFIG.size);
  displayType = model<BadgeDisplayType>(DEFAULT_CONFIG.displayType);
  content = model<string>('');
  visible = model(true);
  value = model<T>();
  max = model(DEFAULT_CONFIG.max);
  showZero = model(DEFAULT_CONFIG.showZero);
  position = model<BadgePosition>(DEFAULT_CONFIG.position);

  // Regular inputs
  overlap = input(false);
  ariaLabel = input<string>();
  formatter = input<((value: T) => string) | undefined>();

  // Computed values
  computedRole = computed(() =>
    this.displayType() === 'counter' ? 'status' : 'img'
  );

  computedAriaLabel = computed(() => {
    if (this.ariaLabel()) return this.ariaLabel();
    if (this.content()) return this.content();
    return this.computeDisplayValue();
  });

  state = computed(() => {
    if (!this.visible()) return 'hidden';
    if (this.overlap()) return 'overlap';
    return this.displayType();
  });

  computeDisplayValue = computed(() => {
    if (this.displayType() === 'dot') {
      return '';
    }

    if (this.displayType() !== 'counter' || this.value() === undefined) {
      return this.content();
    }

    const currentValue = this.value();
    const currentFormatter = this.formatter();

    if (currentFormatter && currentValue !== null && currentValue !== undefined) {
      return currentFormatter(currentValue);
    }

    if (typeof currentValue === 'number') {
      const numericValue = currentValue;
      if (!this.shouldDisplayValue(numericValue)) return this.content() || '';
      return this.formatValue(numericValue);
    }

    return currentValue !== undefined ? String(currentValue) : this.content() || '';
  });

  private shouldDisplayValue(value: number): boolean {
    return value > 0 || this.showZero();
  }

  private formatValue(value: number): string {
    const max = this.max() ?? 99;
    return value > max ? `${max}+` : `${value}`;
  }

  // Static method to apply default configuration
  static applyDefaults(component: PshBadgeComponent): void {
    component.variant.set(DEFAULT_CONFIG.variant);
    component.size.set(DEFAULT_CONFIG.size);
    component.displayType.set(DEFAULT_CONFIG.displayType);
    component.max.set(DEFAULT_CONFIG.max);
    component.showZero.set(DEFAULT_CONFIG.showZero);
    component.position.set(DEFAULT_CONFIG.position);
  }
}