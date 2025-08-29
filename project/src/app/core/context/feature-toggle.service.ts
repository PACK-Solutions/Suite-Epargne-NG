import { Injectable, inject } from '@angular/core';
import { CAPABILITIES_CONFIG, Capability } from '../config/capabilities.token';
import { INSURER_CONFIG } from '../config/insurer.token';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  private defaultCapabilities = inject(CAPABILITIES_CONFIG).features;
  private insurerOverrides = inject(INSURER_CONFIG).featureOverrides || [];
  
  private effectiveCapabilitiesMap = new Map<string, boolean>();

  constructor() {
    this.buildEffectiveCapabilitiesMap();
  }

  private buildEffectiveCapabilitiesMap(): void {
    // 1. Initialiser avec les capacités par défaut
    this.defaultCapabilities.forEach(cap => {
      this.effectiveCapabilitiesMap.set(cap.id, cap.enabled);
    });

    // 2. Appliquer les surcharges spécifiques à l'assureur
    this.insurerOverrides.forEach(override => {
      this.effectiveCapabilitiesMap.set(override.id, override.enabled);
    });
  }
  
  // Check if a feature is enabled
  isFeatureEnabled(featureId: string): boolean {
    // Vérifier si la capacité est dans la carte effective
    if (this.effectiveCapabilitiesMap.has(featureId)) {
      return this.effectiveCapabilitiesMap.get(featureId)!;
    }
    // Si non trouvée, retourner false par sécurité
    return false;
  }
  
  // Get all enabled features
  getAllEnabledFeatures(): Capability[] {
    return this.defaultCapabilities.filter(f => this.isFeatureEnabled(f.id));
  }
  
  // Check if all specified features are enabled
  areAllFeaturesEnabled(featureIds: string[]): boolean {
    return featureIds.every(id => this.isFeatureEnabled(id));
  }
  
  // Check if any of the specified features are enabled
  isAnyFeatureEnabled(featureIds: string[]): boolean {
    return featureIds.some(id => this.isFeatureEnabled(id));
  }
}