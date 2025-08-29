import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Signal for mobile menu state
  private mobileMenuOpenSignal = signal(false);
  
  // Expose signal as read-only
  isMobileMenuOpen = this.mobileMenuOpenSignal.asReadonly();
  
  /**
   * Toggle the mobile menu state
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpenSignal.update(state => !state);
  }
  
  /**
   * Set the mobile menu state
   */
  setMobileMenuOpen(isOpen: boolean): void {
    this.mobileMenuOpenSignal.set(isOpen);
  }
}