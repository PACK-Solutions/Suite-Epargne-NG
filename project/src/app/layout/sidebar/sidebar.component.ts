import { Component, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PshSidebarComponent } from '@lib/components/sidebar/sidebar.component';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarService } from '../services/sidebar.service';
import { CurrentPersonService } from '../../core/context/current-person.service';
import { CurrentContractService } from '../../core/context/current-contract.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, PshSidebarComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private currentPersonService = inject(CurrentPersonService);
  private currentContractService = inject(CurrentContractService);

  isMobileMenuOpen = this.sidebarService.isMobileMenuOpen;
  
  // Computed values for responsive behavior
  private isMobileSignal = signal(false);
  isMobile = computed(() => this.isMobileSignal());
  
  // Sidebar should be open on desktop, controlled by mobile service on mobile
  sidebarOpen = computed(() => {
    return this.isMobile() ? this.isMobileMenuOpen() : true;
  });
  
  // Mode changes based on screen size
  sidebarMode = computed(() => {
    return this.isMobile() ? 'overlay' : 'fixed';
  });
  
  // Signals pour le path actuel
  activePathSignal = signal(this.router.url);
  
  // Signals pour les états d'expansion
  private personsExpandedSignal = signal(false);
  private contractsExpandedSignal = signal(false);

  // Computed signals pour les personnes courantes
  currentPerson = this.currentPersonService.currentIndividualPerson;
  currentLegalPerson = this.currentPersonService.currentLegalPerson;
  currentContract = this.currentContractService.currentContract;

  constructor() {
    // Handle responsive behavior
    this.setupResponsiveListener();
    
    // Écouter les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      takeUntilDestroyed()
    ).subscribe(url => {
      this.activePathSignal.set(url);
      
      // Close mobile menu on navigation
      if (this.isMobile() && this.isMobileMenuOpen()) {
        this.sidebarService.setMobileMenuOpen(false);
      }
      
      // Auto-expand selon l'URL
      if (url.includes('/personnes')) {
        this.personsExpandedSignal.set(true);
      }
      if (url.includes('/contrats')) {
        this.contractsExpandedSignal.set(true);
      }
    });
  }

  private setupResponsiveListener(): void {
    // Check initial screen size
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    this.isMobileSignal.set(mediaQuery.matches);
    
    // Listen for screen size changes
    const handleResize = (e: MediaQueryListEvent) => {
      this.isMobileSignal.set(e.matches);
      
      // Close mobile menu when switching to desktop
      if (!e.matches && this.isMobileMenuOpen()) {
        this.sidebarService.setMobileMenuOpen(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleResize);
  }
  // États d'expansion des menus
  isPersonsExpanded(): boolean {
    return this.personsExpandedSignal() || this.activePathSignal().includes('/personnes');
  }

  isContractsExpanded(): boolean {
    return this.contractsExpandedSignal() || this.activePathSignal().includes('/contrats');
  }

  // États d'activation des menus principaux
  isPersonsActive(): boolean {
    return this.activePathSignal().includes('/personnes');
  }

  isContractsActive(): boolean {
    return this.activePathSignal().includes('/contrats');
  }

  isRentsActive(): boolean {
    return this.activePathSignal().includes('/rentes');
  }

  isDeathActive(): boolean {
    return this.activePathSignal().includes('/deces');
  }

  // Actions de menu
  togglePersonsMenu(event?: Event): void {
    if (event) event.preventDefault();
    this.personsExpandedSignal.update(state => !state);
  }

  toggleContractsMenu(event?: Event): void {
    if (event) event.preventDefault();
    this.contractsExpandedSignal.update(state => !state);
  }

  onSidebarToggle(isOpen: boolean): void {
    if (this.isMobile()) {
      this.sidebarService.setMobileMenuOpen(isOpen);
    }
  }

  closeMobileMenu(): void {
    this.sidebarService.setMobileMenuOpen(false);
  }
}