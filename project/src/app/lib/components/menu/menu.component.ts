import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, MenuMode, MenuVariant } from './menu.types';

@Component({
  selector: 'psh-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class PshMenuComponent<T = string> {

  // Model inputs
  mode = model<MenuMode>('vertical');
  variant = model<MenuVariant>('default');
  collapsible = model(false);
  collapsed = model(false);
  ariaLabels = model<Record<string, string>>({
    disabled: 'Disabled',
    submenu: 'Submenu',
    expand: 'Expand menu',
    collapse: 'Collapse menu'
  });

  // Regular inputs
  items = input<MenuItem<T>[]>([
    { id: 'home', content: 'Home', icon: 'house' } as MenuItem<T>,
    {
      id: 'settings',
      content: 'Settings',
      icon: 'gear',
      children: [
        { id: 'profile', content: 'Profile' } as MenuItem<T>,
        { id: 'security', content: 'Security' } as MenuItem<T>
      ]
    } as MenuItem<T>,
    { id: 'divider1', divider: true, content: 'Divider' } as MenuItem<T>,
    { id: 'help', content: 'Help', icon: 'question' } as MenuItem<T>
  ]);

  // Outputs
  itemClick = output<MenuItem<T>>();
  collapsedChange = output<boolean>();

  // State
  expandedItems = signal(new Set<string>());

  // Computed values
  hasItems = computed(() => this.items().length > 0);
  isHorizontal = computed(() => this.mode() === 'horizontal');
  isCollapsed = computed(() => this.collapsed() && !this.isHorizontal());

  state = computed(() => this.getState());

  private getState(): string {
    if (this.collapsed()) return 'collapsed';
    if (this.collapsible()) return 'collapsible';
    return this.mode();
  }

  toggleItem(item: MenuItem<T>, event?: Event): void {
    if (event) {
      // If the item has a path, let the router handle it
      if (item.path && !item.children?.length) {
        // For items with paths but no children, don't stop propagation
        // Allow the RouterLink to handle navigation
      } else {
        // For items with children or no path, prevent default navigation
        event.preventDefault();
        event.stopPropagation();
      }
    }

    if (item.disabled) return;

    if (item.children?.length) {
      const newExpanded = new Set(this.expandedItems());
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else if (!this.collapsed()) {
        newExpanded.add(item.id);
      }
      this.expandedItems.set(newExpanded);
    }
    this.itemClick.emit(item);
  }

  isExpanded(item: MenuItem<T>): boolean {
    return !this.collapsed() && this.expandedItems().has(item.id);
  }

  toggleCollapse(): void {
    if (this.collapsible()) {
      // Fermer tous les sous-menus lors du collapse
      if (!this.collapsed()) {
        this.expandedItems.set(new Set());
      }
      this.collapsed.update((v) => !v);
      this.collapsedChange.emit(this.collapsed());
    }
  }

  getAriaLabel(item: MenuItem<T>): string {
    const base = item.content;
    if (item.disabled) {
      return `${base} (${this.ariaLabels()['disabled']})`;
    }
    if (item.children?.length) {
      return `${base} (${this.ariaLabels()['submenu']})`;
    }
    return base;
  }
}