import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonDetails } from '../../models/person.model';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { InfoCardData } from '@lib/components/info-card/info-card.types';
import { PshButtonComponent } from '@lib/components/button/button.component';

@Component({
  selector: 'app-person-banking-details-read',
  standalone: true,
  imports: [CommonModule, PshInfoCardComponent, PshButtonComponent],
  templateUrl: './person-banking-details-read.component.html',
  styleUrls: ['./person-banking-details-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonBankingDetailsReadComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);

  personDetails = computed(() => {
    const personId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    return this.personService.getPersonById(personId);
  });

  bankingData = computed(() => {
    const person = this.personDetails();
    if (!person?.bankingInfo) return [];

    const data: InfoCardData[] = [
      { label: 'Nom de la banque', value: person.bankingInfo.bankName },
      { label: 'IBAN', value: person.bankingInfo.iban },
      { label: 'BIC/SWIFT', value: person.bankingInfo.bic },
      { label: 'Titulaire du compte', value: person.bankingInfo.accountHolder },
      { label: 'Type de compte', value: person.bankingInfo.accountType }
    ];

    return data;
  });

  mandateData = computed(() => {
    const person = this.personDetails();
    if (!person?.bankingInfo?.mandate) return [];

    const mandate = person.bankingInfo.mandate;
    const data: InfoCardData[] = [
      { label: 'Référence mandat', value: mandate.reference },
      { label: 'Date de signature', value: mandate.signatureDate ? new Date(mandate.signatureDate).toLocaleDateString('fr-FR') : 'Non renseignée' },
      { label: 'Statut', value: mandate.status },
      { label: 'Type de mandat', value: mandate.type }
    ];

    return data;
  });


  ngOnInit(): void {
    // Component initialization
  }


  editBanking(): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'banque', 'edit']);
  }
}