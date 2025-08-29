import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonDetails } from '../../models/person.model';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { InfoCardData } from '@lib/components/info-card/info-card.types';
import { PshButtonComponent } from '@lib/components/button/button.component';

@Component({
  selector: 'app-person-tax-details-read',
  standalone: true,
  imports: [CommonModule, PshInfoCardComponent, PshButtonComponent],
  templateUrl: './person-tax-details-read.component.html',
  styleUrls: ['./person-tax-details-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonTaxDetailsReadComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);

  personDetails = computed(() => {
    const personId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    return this.personService.getPersonById(personId);
  });

  taxData = computed(() => {
    const person = this.personDetails();
    if (!person?.taxInfo) return [];

    const data: InfoCardData[] = [
      { label: 'Numéro fiscal', value: person.taxInfo.taxNumber },
      { label: 'Foyer fiscal', value: person.taxInfo.householdReference },
      { label: 'Situation fiscale', value: person.taxInfo.taxSituation },
      { label: 'Résidence fiscale', value: person.taxInfo.taxResidence },
      { label: 'Statut FATCA', value: person.taxInfo.fatcaStatus ? 'Oui' : 'Non' },
      { label: 'Pays de résidence', value: person.taxInfo.countryOfResidence }
    ];

    return data;
  });


  ngOnInit(): void {
    // Component initialization
  }


  editTaxInfo(): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'fiscalite', 'edit']);
  }
}