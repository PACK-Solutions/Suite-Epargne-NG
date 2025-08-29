import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonDetails } from '../../models/person.model';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PersonContractsBlockComponent } from '../../blocks/person-contracts-block/person-contracts-block.component';
import { NgIfCapabilityDirective } from '../../../../core/directives/ng-if-capability.directive';
import { Contract } from '../../models/contract.model';
import { InfoCardData } from '@lib/components/info-card/info-card.types';

@Component({
  selector: 'app-person-general-info',
  standalone: true,
  imports: [
    CommonModule,
    PshInfoCardComponent,
    PshButtonComponent,
    PersonContractsBlockComponent,
    NgIfCapabilityDirective
  ],
  templateUrl: './person-general-info.component.html',
  styleUrls: ['./person-general-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonGeneralInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);

  personDetails = computed(() => {
    const personId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    return this.personService.getPersonById(personId);
  });

  civilityData = computed(() => {
    const person = this.personDetails();
    if (!person) return [];

    const data: InfoCardData[] = [
      { label: 'Civilité', value: person.civility },
      { label: 'Prénom', value: person.firstName },
      { label: 'Nom', value: person.lastName },
      { label: 'Date de naissance', value: person.birthDate ? new Date(person.birthDate).toLocaleDateString('fr-FR') : 'Non renseignée' },
      { label: 'Ville de naissance', value: person.birthPlace || 'Non renseigné' },
      { label: 'Pays de naissance', value: person.nationality === 'Française' ? 'FRANCE' : 'Non renseigné' },
      { label: 'Nationalité', value: person.nationality || 'Non renseignée' },
      { label: 'Situation familiale', value: this.getMaritalStatusLabel(person.maritalStatus) },
      { label: 'Tutelle ou curatelle', value: person.guardianshipInfo?.type === 'none' || !person.guardianshipInfo ? 'Non' : 'Oui' },
      { label: 'Date du décès', value: 'Non applicable' } // À adapter selon le modèle de données
    ];

    return data;
  });

  addressData = computed(() => {
    const person = this.personDetails();
    if (!person?.address) return [];

    // Extraire le numéro et la voirie de l'adresse complète
    const address = person.address.street;
    const addressParts = address.match(/^(\d+)\s+(.+)$/);
    const streetNumber = addressParts ? addressParts[1] : 'Non renseigné';
    const streetType = addressParts && addressParts[2] ? this.extractStreetType(addressParts[2]) : 'Non renseigné';

    const data: InfoCardData[] = [
      { label: 'Type', value: person.address.type },
      { label: 'Numéro', value: streetNumber },
      { label: 'Voirie', value: streetType },
      { label: 'Ville', value: person.address.city },
      { label: 'Code postal', value: person.address.postalCode },
      { label: 'Pays', value: person.address.country },
      { label: 'Téléphone', value: person.communication?.phone || person.communication?.mobile || 'Non renseigné' },
      { label: 'Courrier', value: person.communication?.preferredContact === 'postal' ? 'Oui' : 'Non' }
    ];

    return data;
  });

  fiscalData = computed(() => {
    const person = this.personDetails();
    if (!person?.taxInfo) return [];

    const data: InfoCardData[] = [
      { label: 'Régime', value: person.taxInfo.regime || 'Non renseigné' },
      { label: 'Régime local', value: person.taxInfo.regimeLocal || 'Non renseigné' },
      { label: 'Taux PASRAU', value: person.taxInfo.tauxPasrau ? `${person.taxInfo.tauxPasrau}%` : 'Non renseigné' }
    ];

    return data;
  });

  bankingData = computed(() => {
    const person = this.personDetails();
    if (!person?.bankingInfo) return [];

    const data: InfoCardData[] = [
      { label: 'Type de compte', value: 'IBAN' },
      { label: 'IBAN', value: person.bankingInfo.iban },
      { label: 'Début de validité', value: person.bankingInfo.debutValidite || 'Non renseigné' },
      { label: 'Autorisation de prélèvement', value: person.bankingInfo.autorisationPrelevement ? 'Oui' : 'Non' },
      { label: 'Libellé', value: person.bankingInfo.libelle || 'Non renseigné' },
      { label: 'BIC', value: person.bankingInfo.bic },
      { label: 'Fin de validité', value: person.bankingInfo.finValidite || 'Non renseigné' },
      { label: 'Titulaire', value: person.bankingInfo.accountHolder },
      { label: 'Motif de clôture', value: person.bankingInfo.motifCloture || 'Non renseigné' }
    ];

    return data;
  });


  ngOnInit(): void {
    // Component initialization
  }

  private getMaritalStatusLabel(status?: string): string {
    if (!status) return 'Non renseignée';
    
    switch (status) {
      case 'single': return 'Célibataire';
      case 'married': return 'Marié(e)';
      case 'divorced': return 'Divorcé(e)';
      case 'widowed': return 'Veuf(ve)';
      case 'pacs': return 'Pacsé(e)';
      default: return status;
    }
  }

  private extractStreetType(streetPart: string): string {
    // Extraire le type de voirie (Rue, Avenue, Boulevard, etc.)
    const streetTypes = ['Rue', 'Avenue', 'Boulevard', 'Place', 'Cours', 'Allée', 'Impasse', 'Square', 'Chemin', 'Route', 'Promenade'];
    
    for (const type of streetTypes) {
      if (streetPart.toLowerCase().includes(type.toLowerCase())) {
        return type;
      }
    }
    
    return 'Rue'; // Par défaut
  }

  navigateToContract(contract: Contract): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'contrats', contract.id]);
  }

  navigateToSection(section: string): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, section]);
  }
}