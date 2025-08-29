import { Injectable, computed, inject, signal } from '@angular/core';
import { INSURER_CONFIG, InsurerConfig, InsurerCode } from '../config/insurer.token';
import { INSURER_CONTEXT_SERVICE } from '../../lib/services/theme/theme.service';

@Injectable({
  providedIn: 'root'
})
export class InsurerContextService {
  private insurerConfig = inject(INSURER_CONFIG);
  private currentInsurerSignal = signal<InsurerConfig>(this.insurerConfig);
  
  // Expose the insurer code as a readable signal
  readonly insurerCode = computed<InsurerCode>(() => this.currentInsurerSignal().code);
  
  // Expose the insurer name as a readable signal
  readonly insurerName = computed<string>(() => this.currentInsurerSignal().name);
  
  // Expose the insurer logo as a readable signal
  readonly insurerLogo = computed<string>(() => this.currentInsurerSignal().logoPath);
  
  // Expose the primary color as a readable signal
  readonly primaryColor = computed<string>(() => this.currentInsurerSignal().primaryColor);
  
  // Expose the secondary color as a readable signal
  readonly secondaryColor = computed<string>(() => this.currentInsurerSignal().secondaryColor || '');
  
  // Check if a feature is supported by the current insurer
  hasFeature(featureId: string): boolean {
    return this.currentInsurerSignal().features?.includes(featureId) ?? false;
  }
  
  // Check if a fiscality is supported by the current insurer
  supportsFiscality(fiscalityCode: string): boolean {
    return this.currentInsurerSignal().fiscalities?.includes(fiscalityCode) ?? false;
  }
}