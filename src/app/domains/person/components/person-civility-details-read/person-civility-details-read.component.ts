import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonDetails } from '../../models/person.model';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { InfoCardData } from '@lib/components/info-card/info-card.types';
import { PshButtonComponent } from '@lib/components/button/button.component';

@Component({
  selector: 'app-person-civility-details-read',
  standalone: true,
  imports: [CommonModule, PshInfoCardComponent, PshButtonComponent],
  templateUrl: './person-civility-details-read.component.html',
  styleUrls: ['./person-civility-details-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCivilityDetailsReadComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);

  personDetails = computed(() => {
    const personId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    return this.personService.getPersonById(personId);
  });

  personalInfoData = computed(() => {
    const person = this.personDetails();
    if (!person) return [];

    const data: InfoCardData[] = [
      { label: 'Prénom', value: person.firstName },
      { label: 'Nom', value: person.lastName },
      { label: 'Né', value: person.birthDate ? new Date(person.birthDate).toLocaleDateString('fr-FR') : 'Non renseigné' },
      { label: 'Ville de naissance', value: person.birthPlace || 'Non renseigné' },
      { label: 'Pays de naissance', value: person.nationality === 'Française' ? 'FRANCE' : 'Non renseigné' },
      { label: 'Nationalité', value: person.nationality || 'Non renseignée' },
    ];

    return data;
  });

  additionalInfoData = computed(() => {
    const person = this.personDetails();
    if (!person) return [];

    const data: InfoCardData[] = [
      { label: 'Situation familiale', value: this.getMaritalStatusLabel(person.maritalStatus) },
      { label: 'Régime matrimonial', value: person.matrimonialRegime || 'Non renseigné' },
      { label: 'Tutelle ou curatelle', value: person.guardianshipInfo?.type === 'none' || !person.guardianshipInfo ? 'Non' : 'Oui' },
      { label: 'Date du décès', value: 'Non applicable' }, // À adapter selon le modèle de données
      { label: 'Numéro de sécurité sociale', value: person.taxInfo?.taxNumber || 'Non renseigné' },
      { label: 'Matricule', value: '21321514654' }, // À ajouter au modèle si nécessaire
      { label: 'Numéro de certificat', value: '78945' }, // À ajouter au modèle si nécessaire
      { label: 'Login Extranet', value: '11 71 071' } // À ajouter au modèle si nécessaire
    ];

    return data;
  });

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


  ngOnInit(): void {
    // Component initialization
  }


  editCivility(): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'civilite', 'edit']);
  }
}