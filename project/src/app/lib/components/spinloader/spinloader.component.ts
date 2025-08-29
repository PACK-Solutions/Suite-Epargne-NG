import { ChangeDetectionStrategy, Component, computed, inject, input, model, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinLoaderVariant, SpinLoaderSize, SpinLoaderColor, SpinLoaderConfig } from './spinloader.types';

export const SPINLOADER_CONFIG = new InjectionToken<Partial<SpinLoaderConfig>>('SPINLOADER_CONFIG', {
  factory: () => ({
    variant: 'circle',
    size: 'medium',
    color: 'primary'
  })
});

export const SPINLOADER_STYLES = new InjectionToken<Record<string, string>[]>('SPINLOADER_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-spinloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinloader.component.html',
  styleUrls: ['./spinloader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshSpinLoaderComponent {
  private config = inject(SPINLOADER_CONFIG);
  private styles = inject(SPINLOADER_STYLES, { optional: true }) ?? [];

  // Model inputs with defaults from config
  variant = model<SpinLoaderVariant>(this.config.variant ?? 'circle');
  size = model<SpinLoaderSize>(this.config.size ?? 'medium');
  color = model<SpinLoaderColor>(this.config.color ?? 'primary');

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  // Helper methods
  isSmall = computed(() => this.size() === 'small');
  isLarge = computed(() => this.size() === 'large');
  isCircle = computed(() => this.variant() === 'circle');
  isDots = computed(() => this.variant() === 'dots');
  isPulse = computed(() => this.variant() === 'pulse');

  state = computed(() => this.variant());
}