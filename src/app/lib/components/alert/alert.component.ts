import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertType, IconPosition, AlertSize, AlertRole, AlertLabels } from './alert.types';

// Default alert labels
const DEFAULT_LABELS: AlertLabels = {
  dismiss: 'Dismiss alert'
};

// Default alert icons
const DEFAULT_ICONS: Record<string, string> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  danger: 'warning-octagon'
};

// Default alert configuration
const DEFAULT_CONFIG = {
  type: 'info' as AlertType,
  iconPosition: 'left' as IconPosition,
  closable: false,
  size: 'medium' as AlertSize,
  showIcon: true,
  role: 'alert' as AlertRole
};

@Component({
  selector: 'psh-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshAlertComponent {

  // Required model inputs
  type = model<AlertType>(DEFAULT_CONFIG.type);
  
  // Optional model inputs with defaults
  iconPosition = model<IconPosition>(DEFAULT_CONFIG.iconPosition);
  closable = model(DEFAULT_CONFIG.closable);
  size = model<AlertSize>(DEFAULT_CONFIG.size);
  showIcon = model(DEFAULT_CONFIG.showIcon);
  role = model<AlertRole>(DEFAULT_CONFIG.role);
  
  // Regular inputs
  icon = input<string>();
  ariaLabel = input<string>();
  dismissLabel = input(DEFAULT_LABELS.dismiss);
  ariaLive = input<'polite' | 'assertive'>();
  content = input('');
  
  // Outputs
  closed = output<void>();

  // Computed values
  defaultIcon = computed(() => DEFAULT_ICONS[this.type()] || 'info');
  getIcon = computed(() => this.icon() || this.defaultIcon());

  ariaDescribedBy = computed(() => {
    const parts: string[] = [];
    if (this.ariaLabel()) parts.push('alert-label');
    return parts.length ? parts.join(' ') : undefined;
  });

  computedAriaLive = computed(() => 
    this.ariaLive() || (['warning', 'danger'].includes(this.type()) ? 'assertive' : 'polite')
  );

  computedRole = computed(() => 
    this.role() || (['warning', 'danger'].includes(this.type()) ? 'alert' : 'status')
  );

  state = computed(() => {
    if (this.closable()) return 'closable';
    return this.type();
  });

  handleClose(): void {
    this.closed.emit();
  }

  // Static method to apply default configuration
  static applyDefaults(component: PshAlertComponent): void {
    component.type.set(DEFAULT_CONFIG.type);
    component.iconPosition.set(DEFAULT_CONFIG.iconPosition);
    component.closable.set(DEFAULT_CONFIG.closable);
    component.size.set(DEFAULT_CONFIG.size);
    component.showIcon.set(DEFAULT_CONFIG.showIcon);
    component.role.set(DEFAULT_CONFIG.role);
  }
}