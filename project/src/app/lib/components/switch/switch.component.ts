import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  ElementRef,
  InjectionToken
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchSize, SwitchConfig } from './switch.types';

/**
 * Token d'injection pour la configuration globale des switches
 */
export const SWITCH_CONFIG = new InjectionToken<Partial<SwitchConfig>>('SWITCH_CONFIG', {
  factory: () => ({
    checked: false,
    disabled: false,
    required: false,
    size: 'medium',
    labelPosition: 'right'
  })
});

/**
 * Token d'injection pour les styles personnalisés
 */
export const SWITCH_STYLES = new InjectionToken<Record<string, string>[]>('SWITCH_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshSwitchComponent {
  private config = inject(SWITCH_CONFIG);
  private elementRef = inject(ElementRef);
  private styles = inject(SWITCH_STYLES, { optional: true }) ?? [];

  // Model inputs with defaults from config
  checked = model(this.config.checked ?? false);
  disabled = model(this.config.disabled ?? false);
  required = model(this.config.required ?? false);
  size = model<SwitchSize>(this.config.size ?? 'medium');
  labelPosition = model<'left' | 'right'>(this.config.labelPosition ?? 'right');

  // Regular inputs
  label = input('');
  error = input('');
  success = input('');

  // Outputs
  checkedChange = output<boolean>();

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  protected hasContent(): boolean {
    const content = this.elementRef.nativeElement
      .querySelector('.switch-text')
      ?.textContent?.trim();
    return !!content || !!this.label();
  }

  toggle(): void {
    if (!this.disabled()) {
      this.checked.update(v => !v);
      this.checkedChange.emit(this.checked());
    }
  }

  /**
   * Génère un identifiant unique pour les messages
   */
  generateMessageId(type: 'error' | 'success', id: string): string {
    return `${type}-message-${id}`;
  }
}