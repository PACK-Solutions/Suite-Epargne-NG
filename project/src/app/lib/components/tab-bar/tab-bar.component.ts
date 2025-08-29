import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
  InjectionToken
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBarItem, TabBarConfig } from './tab-bar.types';

/**
 * Token d'injection pour la configuration globale de la barre d'onglets
 */
export const TAB_BAR_CONFIG = new InjectionToken<Partial<TabBarConfig>>('TAB_BAR_CONFIG', {
  factory: () => ({
    disabled: false,
    position: 'bottom',
    animated: true,
    iconSize: 'medium'
  })
});

/**
 * Token d'injection pour les styles personnalisés
 */
export const TAB_BAR_STYLES = new InjectionToken<Record<string, string>[]>('TAB_BAR_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshTabBarComponent {
  private config = inject(TAB_BAR_CONFIG);
  private styles = inject(TAB_BAR_STYLES, { optional: true }) ?? [];

  // Default items
  private defaultItems: TabBarItem[] = [
    { id: 'home', label: 'Accueil', icon: 'house' },
    { id: 'search', label: 'Rechercher', icon: 'magnifying-glass' },
    { id: 'notifications', label: 'Notifications', icon: 'bell', badge: '3' },
    { id: 'profile', label: 'Profil', icon: 'user' }
  ];

  // Model inputs with defaults from config
  disabled = model(this.config.disabled ?? false);
  position = model<'bottom' | 'top'>(this.config.position ?? 'bottom');
  animated = model(this.config.animated ?? true);
  iconSize = model<'small' | 'medium' | 'large'>(this.config.iconSize ?? 'medium');
  activeIndex = model(0);

  // Regular inputs
  items = input<TabBarItem[]>(this.defaultItems);

  // Outputs
  activeIndexChange = output<number>();

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  selectTab(index: number): void {
    if (!this.disabled() && this.activeIndex() !== index) {
      this.activeIndex.set(index);
      this.activeIndexChange.emit(index);
    }
  }
}