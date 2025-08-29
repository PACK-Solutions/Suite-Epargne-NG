import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioSize, RadioConfig } from './radio.types';
import { InjectionToken } from '@angular/core';

export const RADIO_CONFIG = new InjectionToken<Partial<RadioConfig>>('RADIO_CONFIG', {
  factory: () => ({
    checked: false,
    disabled: false,
    required: false,
    size: 'medium',
    labelPosition: 'right'
  })
});

export const RADIO_STYLES = new InjectionToken<Record<string, string>[]>('RADIO_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshRadioComponent {
  private config = inject(RADIO_CONFIG);
  private elementRef = inject(ElementRef);
  private styles = inject(RADIO_STYLES, { optional: true }) ?? [];

  // Model inputs with defaults from config
  checked = model(this.config.checked ?? false);
  disabled = model(this.config.disabled ?? false);
  required = model(this.config.required ?? false);
  size = model<RadioSize>(this.config.size ?? 'medium');
  labelPosition = model<'left' | 'right'>(this.config.labelPosition ?? 'right');

  // Regular inputs
  label = input('');
  error = input('');
  success = input('');
  name = input('');
  value = input<any>();

  // Outputs
  valueChange = output<any>();

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    if (this.error()) return 'error';
    if (this.success()) return 'success';
    return this.checked() ? 'checked' : 'unchecked';
  }

  protected hasContent(): boolean {
    const content = this.elementRef.nativeElement
      .querySelector('.radio-text')
      ?.textContent?.trim();
    return !!content || !!this.label();
  }

  handleChange(): void {
    if (!this.disabled()) {
      this.checked.set(true);
      this.valueChange.emit(this.value());
    }
  }

  /**
   * Génère un identifiant unique pour les messages
   */
  generateMessageId(type: 'error' | 'success', id: string): string {
    return `${type}-message-${id}`;
  }
}