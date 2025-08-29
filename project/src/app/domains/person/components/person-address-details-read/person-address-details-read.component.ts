import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonDetails } from '../../models/person.model';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { InfoCardData } from '@lib/components/info-card/info-card.types';
import { PshButtonComponent } from '@lib/components/button/button.component';

@Component({
  selector: 'app-person-address-details-read',
  standalone: true,
  imports: [CommonModule, PshInfoCardComponent, PshButtonComponent],
  templateUrl: './person-address-details-read.component.html',
  styleUrls: ['./person-address-details-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonAddressDetailsReadComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);

  personDetails = computed(() => {
    const personId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    return this.personService.getPersonById(personId);
  });

  addressData = computed(() => {
    const person = this.personDetails();
    if (!person?.address) return [];

    const data: InfoCardData[] = [
      { label: 'Type d\'adresse', value: person.address.type },
      { label: 'Adresse', value: person.address.street },
      { label: 'Ville', value: person.address.city },
      { label: 'Code postal', value: person.address.postalCode },
      { label: 'Pays', value: person.address.country }
    ];

    return data;
  });

  communicationData = computed(() => {
    const person = this.personDetails();
    if (!person?.communication) return [];

    const data: InfoCardData[] = [
      { label: 'Email', value: person.communication.email },
      { label: 'Téléphone fixe', value: person.communication.phone },
      { label: 'Téléphone mobile', value: person.communication.mobile }
    ];

    return data;
  });


  ngOnInit(): void {
    // Component initialization
  }


  editAddress(): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'adresse', 'edit']);
  }
}