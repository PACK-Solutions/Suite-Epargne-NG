import { Injectable, inject } from '@angular/core';
import { MenuItem } from '@lib/components/menu/menu.types';
import { FeatureToggleService } from '../context/feature-toggle.service';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {
  private featureToggleService = inject(FeatureToggleService);

  // Définitions des menus par domaine
  private domainMenus: Record<string, MenuItem[]> = {
    'individual-contract': [
      { id: 'overview', content: 'Vue générale', icon: 'info', path: '', capability: 'contract.individual.overview' },
      { id: 'broker', content: 'Apporteur', icon: 'user', path: '', capability: 'contract.individual.broker' },
      { id: 'administrative', content: 'Administratif', icon: 'file-text', path: '', capability: 'contract.individual.administrative' },
      { id: 'savings', content: 'Epargne acquise', icon: 'wallet', path: '', capability: 'contract.individual.savings' },
      { id: 'movements', content: 'Mouvements', icon: 'arrows-left-right', path: '', capability: 'contract.individual.movements' },
      { id: 'fees', content: 'Frais', icon: 'currency-circle-dollar', path: '', capability: 'contract.individual.fees' },
      { id: 'guarantees', content: 'Garanties', icon: 'shield-check', path: '', capability: 'contract.individual.guarantees' },
      { id: 'sub-product', content: 'Sous-produit', icon: 'package', path: '', capability: 'contract.individual.subProduct' },
      { id: 'mail', content: 'Courriers', icon: 'envelope-simple', path: '', capability: 'contract.individual.mail' },
      { id: 'payments', content: 'Encaissements', icon: 'receipt', path: '', capability: 'contract.individual.payments' },
    ],
    'collective-contract': [
      { id: 'overview', content: 'Vue générale', icon: 'info', path: 'overview', capability: 'contract.collective.overview' },
      { id: 'administrative', content: 'Administratif', icon: 'file-text', path: 'administrative', capability: 'contract.collective.administrative' },
      { id: 'contributions', content: 'Cotisations', icon: 'money', path: 'contributions', capability: 'contract.collective.contributions' },
      { id: 'eligible-placement', content: 'Placement éligibles', icon: 'chart-line', path: 'eligible-placement', capability: 'contract.collective.eligiblePlacement' },
      { id: 'cee', content: 'Compte Epargne entreprise (CEE)', icon: 'building-bank', path: 'cee', capability: 'contract.collective.cee' },
      { id: 'affiliates', content: 'Affiliés', icon: 'users', path: 'affiliates', capability: 'contract.collective.affiliates' },
      { id: 'fees', content: 'Frais', icon: 'currency-circle-dollar', path: 'fees', capability: 'contract.collective.fees' },
      { id: 'guarantees', content: 'Garanties', icon: 'shield-check', path: 'guarantees', capability: 'contract.collective.guarantees' },
      { id: 'sub-product', content: 'Sous-produit', icon: 'package', path: 'sub-product', capability: 'contract.collective.subProduct' },
      { id: 'mail', content: 'Courriers', icon: 'envelope-simple', path: 'mail', capability: 'contract.collective.mail' },
    ],
    'affiliate-contract': [
      { id: 'overview', content: 'Vue générale', icon: 'info', path: 'overview', capability: 'contract.affiliate.overview' },
      { id: 'broker', content: 'Apporteur', icon: 'user', path: 'broker', capability: 'contract.affiliate.broker' },
      { id: 'administrative', content: 'Administratif', icon: 'file-text', path: 'administrative', capability: 'contract.affiliate.administrative' },
      { id: 'savings', content: 'Epargne acquise', icon: 'wallet', path: 'savings', capability: 'contract.affiliate.savings' },
      { id: 'movements', content: 'Mouvements', icon: 'arrows-left-right', path: 'movements', capability: 'contract.affiliate.movements' },
      { id: 'fees', content: 'Frais', icon: 'currency-circle-dollar', path: 'fees', capability: 'contract.affiliate.fees' },
      { id: 'guarantees', content: 'Garanties', icon: 'shield-check', path: 'guarantees', capability: 'contract.affiliate.guarantees' },
      { id: 'sub-product', content: 'Sous-produit', icon: 'package', path: 'sub-product', capability: 'contract.affiliate.subProduct' },
      { id: 'mail', content: 'Courriers', icon: 'envelope-simple', path: 'mail', capability: 'contract.affiliate.mail' },
      { id: 'payments', content: 'Encaissements', icon: 'receipt', path: 'payments', capability: 'contract.affiliate.payments' },
    ],
    'rents': [
      { id: 'overview', content: 'Vue générale', icon: 'info', path: 'overview', capability: 'rents.overview' },
      { id: 'payments', content: 'Paiements', icon: 'receipt', path: 'payments', capability: 'rents.payments' },
      { id: 'history', content: 'Historique', icon: 'clock-clockwise', path: 'history', capability: 'rents.history' },
      { id: 'documents', content: 'Documents', icon: 'files', path: 'documents', capability: 'rents.documents' },
    ],
    'death': [
      { id: 'overview', content: 'Vue générale', icon: 'info', path: 'overview', capability: 'death.overview' },
      { id: 'declaration', content: 'Déclaration', icon: 'file-text', path: 'declaration', capability: 'death.declaration' },
      { id: 'beneficiaries', content: 'Bénéficiaires', icon: 'users', path: 'beneficiaries', capability: 'death.beneficiaries' },
      { id: 'documents', content: 'Documents', icon: 'files', path: 'documents', capability: 'death.documents' },
    ]
  };

  /**
   * Retourne les éléments de menu filtrés par les capacités activées pour un domaine donné.
   * @param domain Le domaine métier (ex: 'individual-contract', 'rents').
   * @returns Un tableau de MenuItem filtré.
   */
  getFilteredMenuItems(domain: string): MenuItem[] {
    const menuItems = this.domainMenus[domain] || [];
    return menuItems.filter(item =>
      !item.capability || this.featureToggleService.isFeatureEnabled(item.capability)
    );
  }

  /**
   * Vérifie si un domaine a des éléments de menu disponibles après filtrage.
   * @param domain Le domaine métier à vérifier.
   * @returns true si le domaine a au moins un élément de menu disponible.
   */
  hasDomainMenuItems(domain: string): boolean {
    return this.getFilteredMenuItems(domain).length > 0;
  }

  /**
   * Ajoute ou met à jour un élément de menu pour un domaine spécifique.
   * @param domain Le domaine métier.
   * @param menuItem L'élément de menu à ajouter ou mettre à jour.
   */
  addOrUpdateMenuItem(domain: string, menuItem: MenuItem): void {
    if (!this.domainMenus[domain]) {
      this.domainMenus[domain] = [];
    }
    
    const existingIndex = this.domainMenus[domain].findIndex(item => item.id === menuItem.id);
    if (existingIndex >= 0) {
      this.domainMenus[domain][existingIndex] = menuItem;
    } else {
      this.domainMenus[domain].push(menuItem);
    }
  }

  /**
   * Supprime un élément de menu d'un domaine spécifique.
   * @param domain Le domaine métier.
   * @param menuItemId L'ID de l'élément de menu à supprimer.
   * @returns true si l'élément a été trouvé et supprimé.
   */
  removeMenuItem(domain: string, menuItemId: string): boolean {
    if (!this.domainMenus[domain]) {
      return false;
    }
    
    const initialLength = this.domainMenus[domain].length;
    this.domainMenus[domain] = this.domainMenus[domain].filter(item => item.id !== menuItemId);
    
    return this.domainMenus[domain].length < initialLength;
  }
}