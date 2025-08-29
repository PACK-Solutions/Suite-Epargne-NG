import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarVariant, ProgressbarSize, ProgressbarConfig } from './progressbar.types';
import { InjectionToken } from '@angular/core';

export const PROGRESSBAR_CONFIG = new InjectionToken<Partial<ProgressbarConfig>>('PROGRESSBAR_CONFIG', {
  factory: () => ({
    value: 0,
    max: 100,
    variant: 'primary',
    size: 'medium',
    showLabel: true,
    indeterminate: false,
    striped: false,
    animated: false
  })
});

@Component({
  selector: 'psh-progressbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshProgressbarComponent {
  private config = inject(PROGRESSBAR_CONFIG);

  // Model inputs with defaults from config
  value = model(this.config.value ?? 0);
  max = model(this.config.max ?? 100);
  variant = model<ProgressbarVariant>(this.config.variant ?? 'primary');
  size = model<ProgressbarSize>(this.config.size ?? 'medium');
  showLabel = model(this.config.showLabel ?? true);
  indeterminate = model(this.config.indeterminate ?? false);
  striped = model(this.config.striped ?? false);
  animated = model(this.config.animated ?? false);

  // Regular inputs
  label = input('Loading...');

  // Computed values
  percentage = computed(() => {
    return Math.min(100, Math.max(0, (this.value() / this.max()) * 100));
  });

  computedAriaValueText = computed(() => {
    if (this.indeterminate()) {
      return this.label();
    }
    return `${this.percentage()}%`;
  });

  state = computed(() => this.getState());

  private getState(): string {
    if (this.indeterminate()) return 'indeterminate';
    if (this.animated()) return 'animated';
    if (this.striped()) return 'striped';
    return 'default';
  }
}