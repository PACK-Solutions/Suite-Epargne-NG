import { InjectionToken } from '@angular/core';

export interface FiscalityOption {
  code: string;
  name: string;
  description?: string;
  enabled: boolean;
}

export interface FiscalityConfig {
  options: FiscalityOption[];
  defaultOption?: string;
}

export const FISCALITY_CONFIG = new InjectionToken<FiscalityConfig>('FISCALITY_CONFIG', {
  factory: () => ({
    options: [
      { code: 'pero', name: 'PER Obligatoire', description: 'Plan Epargne Retraite Obligatoire', enabled: true },
      { code: 'article83', name: 'Article 83', description: 'Régime Article 83', enabled: true },
      { code: 'perin', name: 'PER Individuel', description: 'Plan Epargne Retraite Individuel', enabled: true }
    ],
    defaultOption: 'pero'
  })
});