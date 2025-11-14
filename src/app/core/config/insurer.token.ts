import { InjectionToken } from '@angular/core';

export type InsurerCode = 'gan' | 'allianz' | 'malakoff' | 'generali';

export interface InsurerConfig {
  code: InsurerCode;
  name: string;
  logoPath: string;
  primaryColor: string;
  secondaryColor?: string;
  features?: string[]; // Ancienne propriété, conservée pour compatibilité
  featureOverrides?: { id: string; enabled: boolean; }[]; // Nouvelle propriété pour contrôler les capacités
  fiscalities?: string[];
}

export const INSURER_CONFIG = new InjectionToken<InsurerConfig>('INSURER_CONFIG', {
  factory: () => ({
    code: 'gan',
    name: 'GAN Assurances',
    logoPath: '/assets/logos/gan.svg',
    primaryColor: '#FF0000',
    secondaryColor: '',
    features: ['person.edit', 'contract.create', 'contract.fiscality.pero'],
    featureOverrides: [
      { id: 'person.displayFiscalInfoGeneralView', enabled: true }, // Désactiver l'affichage des infos fiscales pour les personnes physiques chez GAN
      { id: 'personLegal.displayFiscalInfoGeneralView', enabled: true }, // Désactiver l'affichage des infos fiscales pour les personnes morales chez GAN
      { id: 'person.displayBankingGeneralView', enabled: true }, // Activer l'affichage des coordonnées bancaires pour les personnes physiques chez GAN
      { id: 'domain.personnes', enabled: true }, // Activer le domaine Personnes pour GAN (par défaut)
      { id: 'domain.contrats', enabled: true }, // Activer le domaine Contrats pour GAN (par défaut)
      { id: 'domain.rentes', enabled: true }, // Désactiver le domaine Rentes pour GAN
      { id: 'domain.deces', enabled: true }, // Désactiver le domaine Décès pour GAN
    ],
    fiscalities: ['pero', 'article83', 'perin']
  })
});