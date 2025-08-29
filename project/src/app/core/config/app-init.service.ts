import { Injectable, inject } from '@angular/core';
import { INSURER_CONFIG, InsurerConfig } from './insurer.token';
import { CAPABILITIES_CONFIG, CapabilitiesConfig } from './capabilities.token';
import { FISCALITY_CONFIG, FiscalityConfig } from './fiscality-config.token';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  private insurerConfig = inject(INSURER_CONFIG);
  private capabilitiesConfig = inject(CAPABILITIES_CONFIG);
  private fiscalityConfig = inject(FISCALITY_CONFIG);
  
  async initializeApp(): Promise<boolean> {
    try {
      console.log(`Initializing app for insurer: ${this.insurerConfig.name}`);
      
      // In a real app, this would load configurations from a backend
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.validateConfigurations();
      
      return true;
    } catch (error) {
      console.error('Error initializing app:', error);
      return false;
    }
  }
  
  private validateConfigurations(): void {
    // Validate that the insurer has all required capabilities
    const requiredCapabilities = ['person.edit', 'contract.create'];
    const missingCapabilities = requiredCapabilities.filter(cap => 
      !this.capabilitiesConfig.features.some(f => f.id === cap && f.enabled)
    );
    
    if (missingCapabilities.length > 0) {
      console.warn(`Insurer ${this.insurerConfig.name} is missing required capabilities:`, missingCapabilities);
    }
    
    // Validate fiscality options
    const availableFiscalities = this.fiscalityConfig.options
      .filter(f => f.enabled)
      .map(f => f.code);
    
    if (availableFiscalities.length === 0) {
      console.warn('No fiscality options are available');
    }
  }
}