import { ChangeDetectionStrategy, Component, computed, inject, input, model, output, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagVariant, TagSize, TagConfig } from './tag.types';

export const TAG_CONFIG = new InjectionToken<Partial<TagConfig>>('TAG_CONFIG', {
  factory: () => ({
    variant: 'primary',
    size: 'medium',
    closable: false,
    disabled: false,
    closeLabel: 'Supprimer le tag',
    ariaLabels: {
      close: 'Supprimer le tag',
      disabled: 'Tag désactivé',
      status: 'État'
    }
  })
});

export const TAG_STYLES = new InjectionToken<Record<string, string>[]>('TAG_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshTagComponent {
  private config = inject(TAG_CONFIG);
  private styles = inject(TAG_STYLES, { optional: true }) ?? [];

  // Model inputs with defaults from config
  variant = model<TagVariant>(this.config.variant ?? 'primary');
  size = model<TagSize>(this.config.size ?? 'medium');
  closable = model(this.config.closable ?? false);
  disabled = model(this.config.disabled ?? false);

  // Regular inputs
  icon = input<string>();
  closeLabel = input(this.config.closeLabel ?? 'Supprimer le tag');
  content = input('Tag');

  // Outputs
  clicked = output<MouseEvent>();
  closed = output<void>();

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  state = computed(() => this.disabled() ? 'disabled' : 'default');

  handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }

  handleClose(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.closed.emit();
    }
  }
}