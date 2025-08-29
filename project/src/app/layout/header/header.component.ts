import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PshAvatarComponent } from '@lib/components/avatar/avatar.component';
import { PshDropdownComponent } from '@lib/components/dropdown/dropdown.component';
import { ThemeService } from '../../lib/services/theme/theme.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PshButtonComponent, PshAvatarComponent, PshDropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private sidebarService = inject(SidebarService);

  isDarkTheme = this.themeService.isDarkTheme;
  isMobileMenuOpen = this.sidebarService.isMobileMenuOpen;

  logoSrc = computed(() => {
    return '/assets/logo.svg';
  });

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.sidebarService.toggleMobileMenu();
  }
}