import { InjectionToken } from '@angular/core';

export interface Capability {
  id: string;
  enabled: boolean;
  description?: string;
}

export interface CapabilitiesConfig {
  features: Capability[];
}

export const CAPABILITIES_CONFIG = new InjectionToken<CapabilitiesConfig>('CAPABILITIES_CONFIG', {
  factory: () => ({
    features: [
      { id: 'person.edit', enabled: true, description: 'Edit person information' },
      { id: 'person.delete', enabled: false, description: 'Delete person' },
      { id: 'contract.create', enabled: true, description: 'Create new contracts' },
      { id: 'contract.fiscality.pero', enabled: true, description: 'PERO fiscality features' },
      { id: 'contract.fiscality.article83', enabled: true, description: 'Article 83 fiscality features' },
      { id: 'contract.fiscality.perin', enabled: true, description: 'PERIN fiscality features' },
      
      // Capacités pour les contrats individuels
      { id: 'contract.individual.overview', enabled: true, description: 'Vue générale contrat individuel' },
      { id: 'contract.individual.broker', enabled: true, description: 'Apporteur contrat individuel' },
      { id: 'contract.individual.administrative', enabled: true, description: 'Administratif contrat individuel' },
      { id: 'contract.individual.savings', enabled: true, description: 'Epargne acquise contrat individuel' },
      { id: 'contract.individual.movements', enabled: true, description: 'Mouvements contrat individuel' },
      { id: 'contract.individual.fees', enabled: true, description: 'Frais contrat individuel' },
      { id: 'contract.individual.guarantees', enabled: true, description: 'Garanties contrat individuel' },
      { id: 'contract.individual.subProduct', enabled: true, description: 'Sous-produit contrat individuel' },
      { id: 'contract.individual.mail', enabled: true, description: 'Courriers contrat individuel' },
      { id: 'contract.individual.payments', enabled: true, description: 'Encaissements contrat individuel' },

      // Capacités pour les contrats collectifs
      { id: 'contract.collective.overview', enabled: true, description: 'Vue générale contrat collectif' },
      { id: 'contract.collective.administrative', enabled: true, description: 'Administratif contrat collectif' },
      { id: 'contract.collective.contributions', enabled: true, description: 'Cotisations contrat collectif' },
      { id: 'contract.collective.eligiblePlacement', enabled: true, description: 'Placement éligibles contrat collectif' },
      { id: 'contract.collective.cee', enabled: true, description: 'Compte Epargne entreprise (CEE) contrat collectif' },
      { id: 'contract.collective.affiliates', enabled: true, description: 'Affiliés contrat collectif' },
      { id: 'contract.collective.fees', enabled: true, description: 'Frais contrat collectif' },
      { id: 'contract.collective.guarantees', enabled: true, description: 'Garanties contrat collectif' },
      { id: 'contract.collective.subProduct', enabled: true, description: 'Sous-produit contrat collectif' },
      { id: 'contract.collective.mail', enabled: true, description: 'Courriers contrat collectif' },

      // Capacités pour les contrats affiliés
      { id: 'contract.affiliate.overview', enabled: true, description: 'Vue générale contrat affilié' },
      { id: 'contract.affiliate.broker', enabled: true, description: 'Apporteur contrat affilié' },
      { id: 'contract.affiliate.administrative', enabled: true, description: 'Administratif contrat affilié' },
      { id: 'contract.affiliate.savings', enabled: true, description: 'Epargne acquise contrat affilié' },
      { id: 'contract.affiliate.movements', enabled: true, description: 'Mouvements contrat affilié' },
      { id: 'contract.affiliate.fees', enabled: true, description: 'Frais contrat affilié' },
      { id: 'contract.affiliate.guarantees', enabled: true, description: 'Garanties contrat affilié' },
      { id: 'contract.affiliate.subProduct', enabled: true, description: 'Sous-produit contrat affilié' },
      { id: 'contract.affiliate.mail', enabled: true, description: 'Courriers contrat affilié' },
      { id: 'contract.affiliate.payments', enabled: true, description: 'Encaissements contrat affilié' },

      // Capacités pour les rentes
      { id: 'rents.overview', enabled: true, description: 'Vue générale rentes' },
      { id: 'rents.payments', enabled: true, description: 'Paiements rentes' },
      { id: 'rents.history', enabled: true, description: 'Historique rentes' },
      { id: 'rents.documents', enabled: true, description: 'Documents rentes' },

      // Capacités pour les décès
      { id: 'death.overview', enabled: true, description: 'Vue générale décès' },
      { id: 'death.declaration', enabled: true, description: 'Déclaration décès' },
      { id: 'death.beneficiaries', enabled: true, description: 'Bénéficiaires décès' },
      { id: 'death.documents', enabled: true, description: 'Documents décès' },
      
      // Capacités pour la vue générale des personnes physiques
      { id: 'person.displayContractsGeneralView', enabled: true, description: 'Display contracts list on individual person general view' },
      { id: 'person.displayCivilityGeneralView', enabled: true, description: 'Display civility info card on individual person general view' },
      { id: 'person.displayAddressGeneralView', enabled: true, description: 'Display address info card on individual person general view' },
      { id: 'person.displayFiscalInfoGeneralView', enabled: true, description: 'Display fiscal info card on individual person general view' },
      { id: 'person.displayBankingGeneralView', enabled: true, description: 'Display banking info card on individual person general view' },

      // Capacités pour la vue générale des personnes morales
      { id: 'personLegal.displayContractsGeneralView', enabled: true, description: 'Display contracts list on legal person general view' },
      { id: 'personLegal.displayGeneralInfoGeneralView', enabled: true, description: 'Display general info card on legal person general view' },
      { id: 'personLegal.displayRepresentativeGeneralView', enabled: true, description: 'Display representative info card on legal person general view' },
      { id: 'personLegal.displayAddressGeneralView', enabled: true, description: 'Display address info card on legal person general view' },
      { id: 'personLegal.displayFiscalInfoGeneralView', enabled: true, description: 'Display fiscal info card on legal person general view' },
      { id: 'personLegal.displayBankingGeneralView', enabled: true, description: 'Display banking info card on legal person general view' },
      
      // Domaines de navigation principaux
      { id: 'domain.personnes', enabled: true, description: 'Enable Personnes domain' },
      { id: 'domain.contrats', enabled: true, description: 'Enable Contrats domain' },
      { id: 'domain.rentes', enabled: true, description: 'Enable Rentes domain' },
      { id: 'domain.deces', enabled: true, description: 'Enable Décès domain' }
    ]
  })
});