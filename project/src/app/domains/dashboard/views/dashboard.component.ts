import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonService } from '../../person/services/person.service';
import { PersonLegalService } from '../../person/services/person-legal.service';
import { ContractDataService } from '../../contracts/services/contract-data.service';
import { PersonDetails, PersonLegalDetails } from '../../person/models/person.model';
import { Contract } from '../../person/models/contract.model';
import { PshInputComponent } from '@lib/components/input/input.component';

interface SearchResults {
  persons: PersonDetails[];
  legalPersons: PersonLegalDetails[];
  contracts: Contract[];
  total: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PshInputComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private router = inject(Router);
  private personService = inject(PersonService);
  private personLegalService = inject(PersonLegalService);
  private contractService = inject(ContractDataService);

  // State
  private searchTermSignal = signal('');
  private searchResultsSignal = signal<SearchResults | null>(null);
  private focusedResultIndexSignal = signal(-1);

  // Computed
  searchTerm = computed(() => this.searchTermSignal());
  searchResults = computed(() => this.searchResultsSignal());
  focusedResultIndex = computed(() => this.focusedResultIndexSignal());

  onSearchChange(term: string): void {
    this.searchTermSignal.set(term);
    this.focusedResultIndexSignal.set(-1); // Reset focus when search changes
    
    if (term.length >= 2) {
      this.performSearch(term);
    } else {
      this.searchResultsSignal.set(null);
    }
  }

  onSearchKeydown(event: KeyboardEvent): void {
    const results = this.searchResults();
    if (!results || results.total === 0) return;

    const allResults = [
      ...results.persons,
      ...results.legalPersons,
      ...results.contracts
    ];

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedResultIndexSignal.update(index => {
          const nextIndex = index < allResults.length - 1 ? index + 1 : 0;
          this.scrollResultIntoView(nextIndex);
          return nextIndex;
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedResultIndexSignal.update(index => {
          const prevIndex = index > 0 ? index - 1 : allResults.length - 1;
          this.scrollResultIntoView(prevIndex);
          return prevIndex;
        });
        break;

      case 'Enter':
        event.preventDefault();
        const focusedIndex = this.focusedResultIndexSignal();
        if (focusedIndex >= 0 && focusedIndex < allResults.length) {
          this.navigateToResult(allResults[focusedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.searchTermSignal.set('');
        this.searchResultsSignal.set(null);
        this.focusedResultIndexSignal.set(-1);
        break;
    }
  }

  private scrollResultIntoView(index: number): void {
    setTimeout(() => {
      const resultElement = document.querySelector(`.result-item[data-index="${index}"]`);
      if (resultElement) {
        resultElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  private navigateToResult(result: any): void {
    if ('firstName' in result) {
      // Individual person
      this.navigateToPerson(result);
    } else if ('raisonSociale' in result) {
      // Legal person
      this.navigateToLegalPerson(result);
    } else if ('contractNumber' in result) {
      // Contract
      this.navigateToContract(result);
    }
  }

  isResultFocused(index: number): boolean {
    return this.focusedResultIndexSignal() === index;
  }
  private performSearch(query: string): void {
    const lowerQuery = query.toLowerCase();
    
    // Recherche dans les personnes physiques
    const persons = this.personService.getAllPersons().filter(person =>
      person.firstName.toLowerCase().includes(lowerQuery) ||
      person.lastName.toLowerCase().includes(lowerQuery) ||
      person.communication?.email?.toLowerCase().includes(lowerQuery)
    );
    
    // Recherche dans les personnes morales
    const legalPersons = this.personLegalService.getAllLegalPersons().filter(entity =>
      entity.raisonSociale.toLowerCase().includes(lowerQuery) ||
      entity.siret.includes(lowerQuery) ||
      entity.siren.includes(lowerQuery) ||
      entity.representantLegal?.firstName.toLowerCase().includes(lowerQuery) ||
      entity.representantLegal?.lastName.toLowerCase().includes(lowerQuery)
    );
    
    // Recherche dans les contrats
    const contracts = this.contractService.getAllContracts().filter(contract =>
      contract.contractNumber.toLowerCase().includes(lowerQuery) ||
      contract.product.toLowerCase().includes(lowerQuery) ||
      contract.status.toLowerCase().includes(lowerQuery) ||
      contract.acquiredSavings.toString().includes(query)
    );

    const results: SearchResults = {
      persons,
      legalPersons,
      contracts,
      total: persons.length + legalPersons.length + contracts.length
    };

    this.searchResultsSignal.set(results);
  }

  navigateToPerson(person: PersonDetails): void {
    this.router.navigate(['/personnes', person.id]);
  }

  navigateToLegalPerson(entity: PersonLegalDetails): void {
    this.router.navigate(['/personnes-morales', entity.id]);
  }

  navigateToContract(contract: Contract): void {
    this.router.navigate(['/contrats', contract.id]);
  }
}