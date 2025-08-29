import { InjectionToken } from '@angular/core';

export interface ContractConfig {
  defaultProduct: string;
  allowedStatuses: string[];
  minimumSavings: number;
  maximumSavings: number;
  defaultCurrency: string;
}

export const CONTRACT_CONFIG = new InjectionToken<ContractConfig>('CONTRACT_CONFIG', {
  factory: () => ({
    defaultProduct: 'PER Individuel',
    allowedStatuses: ['active', 'pending', 'closed'],
    minimumSavings: 0,
    maximumSavings: 1000000,
    defaultCurrency: 'EUR'
  })
});