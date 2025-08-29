import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonAppearance, ButtonVariant, ButtonSize, ButtonIconPosition } from './button.types';

@Component({
  selector: 'psh-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshButtonComponent {
  private elementRef = inject(ElementRef);

  // Model inputs
  appearance = model<ButtonAppearance>('filled');
  variant = model<ButtonVariant>('primary');
  size = model<ButtonSize>('medium');
  disabled = model(false);
  loading = model(false);
  fullWidth = model(false);
  iconPosition = model<ButtonIconPosition>('left');

  // Regular inputs
  icon = input<string>();
  ariaLabel = input<string>();
  loadingText = input('Loading...');
  disabledText = input('This action is currently unavailable');
  iconOnlyText = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');

  // Outputs
  clicked = output<MouseEvent>();

  // Computed values
  computedAriaLabel = computed(() => {
    if (this.ariaLabel()) return this.ariaLabel();
    if (this.loading()) return this.loadingText();
    if (this.disabled()) return this.disabledText();
    if (this.iconPosition() === 'only') {
      return this.iconOnlyText() || `${this.variant()} button`;
    }
    return '';
  });

  state = computed(() => {
    if (this.disabled()) return 'disabled';
    if (this.loading()) return 'loading';
    return 'default';
  });

  protected hasContent(): boolean {
    const content = this.elementRef.nativeElement
      .querySelector('.button-content')
      ?.textContent?.trim();
    return !!content;
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}