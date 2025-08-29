import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonLegalService } from '../../services/person-legal.service';
import { PersonDetails, PersonLegalDetails } from '../../models/person.model';
import { PshInputComponent } from '@lib/components/input/input.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PshTableComponent } from '@lib/components/table/table.component';
import { TableColumn, TableRow } from '@lib/components/table/table.types';

@Component({
  selector: 'app-global-persons',
  standalone: true,
  imports: [
    CommonModule,
    PshInputComponent,
    PshButtonComponent,
    PshTableComponent
  ],
  templateUrl: './global-persons.component.html',
  styleUrls: ['./global-persons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalPersonsComponent {
  private router = inject(Router);
  private personService = inject(PersonService);
  private personLegalService = inject(PersonLegalService);

  // State
  private searchTermSignal = signal('');

  // Computed
  searchTerm = computed(() => this.searchTermSignal());

  // Combined data for "All" tab
  allPersonsData = computed(() => {
    const searchTerm = this.searchTermSignal().toLowerCase();
    
    // Get individuals
    const individuals = this.personService.getAllPersons()
      .filter((person: PersonDetails) => !searchTerm || 
        person.firstName.toLowerCase().includes(searchTerm) ||
        person.lastName.toLowerCase().includes(searchTerm) ||
        person.communication?.email?.toLowerCase().includes(searchTerm)
      )
      .map((person: PersonDetails) => ({
        id: person.id,
        type: 'Personne physique',
        name: `${person.firstName} ${person.lastName}`,
        email: person.communication?.email || 'Non renseigné',
        city: person.address?.city || 'Non renseignée',
        contractsCount: person.contracts?.length || 0,
        actions: person.id
      }));
    
    // Get legal persons
    const legals = this.personLegalService.getAllLegalPersons()
      .filter((person: PersonLegalDetails) => !searchTerm ||
        person.raisonSociale.toLowerCase().includes(searchTerm) ||
        person.siret.includes(searchTerm) ||
        person.representantLegal?.firstName.toLowerCase().includes(searchTerm) ||
        person.representantLegal?.lastName.toLowerCase().includes(searchTerm)
      )
      .map((person: PersonLegalDetails) => ({
        id: person.id,
        type: 'Personne morale',
        name: person.raisonSociale,
        email: 'N/A',
        city: person.address?.city || 'Non renseignée',
        contractsCount: person.contracts?.length || 0,
        actions: person.id
      }));
    
    return [...individuals, ...legals];
  });

  allPersonsColumns: TableColumn[] = [
    { key: 'type', label: 'Type', sortable: true },
    { key: 'name', label: 'Nom / Raison sociale', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'city', label: 'Ville', sortable: true },
    { key: 'contractsCount', label: 'Contrats', sortable: true },
    { key: 'actions', label: 'Actions' }
  ];

  // Methods
  onSearch(term: string): void {
    this.searchTermSignal.set(term);
  }

  createPerson(): void {
    this.router.navigate(['/personnes/nouveau']);
  }

  navigateToPerson(row: TableRow): void {
    const personType = row['type'] === 'Personne morale' ? 'personnes-morales' : 'personnes';
    this.router.navigate([`/${personType}`, row.id]);
  }
}