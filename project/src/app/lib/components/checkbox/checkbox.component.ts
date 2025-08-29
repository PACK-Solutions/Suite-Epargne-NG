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
import { CheckboxSize } from './checkbox.types';

// Default configuration
const DEFAULT_CONFIG = {
  checked: false,
  disabled: false,
  required: false,
  indeterminate: false,
  size: 'medium' as CheckboxSize,
  labelPosition: 'right' as 'left' | 'right'
};

@Component({
  selector: 'psh-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshCheckboxComponent {
  private elementRef = inject(ElementRef);

  // Model inputs with defaults
  checked = model(DEFAULT_CONFIG.checked);
  disabled = model(DEFAULT_CONFIG.disabled);
  required = model(DEFAULT_CONFIG.required);
  indeterminate = model(DEFAULT_CONFIG.indeterminate);
  size = model<CheckboxSize>(DEFAULT_CONFIG.size);
  labelPosition = model<'left' | 'right'>(DEFAULT_CONFIG.labelPosition);

  // Regular inputs
  label = input('');
  error = input('');
  success = input('');

  // Outputs
  checkedChange = output<boolean>();

  // Computed values
  ariaChecked = computed(() => 
    this.indeterminate() ? 'mixed' : this.checked()
  );

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    if (this.indeterminate()) return 'indeterminate';
    if (this.error()) return 'error';
    if (this.success()) return 'success';
    return this.checked() ? 'checked' : 'unchecked';
  }

  protected hasContent(): boolean {
    const content = this.elementRef.nativeElement
      .querySelector('.checkbox-text')
      ?.textContent?.trim();
    return !!content || !!this.label();
  }

  toggle(): void {
    if (!this.disabled()) {
      const newValue = !this.checked();
      this.checked.set(newValue);
      this.indeterminate.set(false);
      this.checkedChange.emit(newValue);
    }
  }

  // Static method to apply default configuration
  static applyDefaults(component: PshCheckboxComponent): void {
    component.checked.set(DEFAULT_CONFIG.checked);
    component.disabled.set(DEFAULT_CONFIG.disabled);
    component.required.set(DEFAULT_CONFIG.required);
    component.indeterminate.set(DEFAULT_CONFIG.indeterminate);
    component.size.set(DEFAULT_CONFIG.size);
    component.labelPosition.set(DEFAULT_CONFIG.labelPosition);
  }
}