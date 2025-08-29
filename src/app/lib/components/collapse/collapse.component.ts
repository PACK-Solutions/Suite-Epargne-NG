import { ChangeDetectionStrategy, Component, computed, input, model, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseVariant, CollapseSize } from './collapse.types';

// Default configuration
const DEFAULT_CONFIG = {
  expanded: false,
  disabled: false,
  icon: 'caret-down',
  variant: 'default' as CollapseVariant,
  size: 'medium' as CollapseSize
};

@Component({
  selector: 'psh-collapse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshCollapseComponent {

  // Model inputs with defaults
  expanded = model(DEFAULT_CONFIG.expanded);
  disabled = model(DEFAULT_CONFIG.disabled);
  variant = model<CollapseVariant>(DEFAULT_CONFIG.variant);
  size = model<CollapseSize>(DEFAULT_CONFIG.size);

  // Regular inputs
  icon = input<string>(DEFAULT_CONFIG.icon);
  header = input('');

  // Outputs
  expandedChange = output<boolean>();

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    return this.expanded() ? 'expanded' : 'collapsed';
  }

  toggle(): void {
    if (!this.disabled()) {
      const newValue = !this.expanded();
      this.expanded.set(newValue);
      this.expandedChange.emit(newValue);
    }
  }

  // Static method to apply default configuration
  static applyDefaults(component: PshCollapseComponent): void {
    component.expanded.set(DEFAULT_CONFIG.expanded);
    component.disabled.set(DEFAULT_CONFIG.disabled);
    component.variant.set(DEFAULT_CONFIG.variant);
    component.size.set(DEFAULT_CONFIG.size);
  }
}