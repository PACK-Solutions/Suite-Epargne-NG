/**
 * Types de fiscalité disponibles
 */
export type FiscalityType = 'pero' | 'article83' | 'perin' | 'madelin';

/**
 * Configuration fiscale
 */
export interface FiscalityConfig {
  type: FiscalityType;
  label: string;
  description: string;
  enabled: boolean;
}

/**
 * Plafonds fiscaux
 */
export interface FiscalityLimits {
  annualLimit: number;
  totalLimit?: number;
  deductionRate: number;
}

/**
 * Avantages fiscaux
 */
export interface FiscalityBenefits {
  deductible: boolean;
  deductionLimit: number;
  taxCredit?: number;
  socialContributions?: boolean;
}