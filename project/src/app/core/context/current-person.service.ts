import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PersonDetails } from '../../domains/person/models/person.model';
import { PersonLegalDetails } from '../../domains/person/models/person-legal.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentPersonService {
  private router = inject(Router);
  
  // Signals for both individual and legal persons
  private currentIndividualPersonSignal = signal<PersonDetails | null>(null);
  private currentLegalPersonSignal = signal<PersonLegalDetails | null>(null);
  
  // Computed to check if there's any current person (individual or legal)
  readonly hasCurrentPerson = computed(() => 
    this.currentIndividualPersonSignal() !== null || 
    this.currentLegalPersonSignal() !== null
  );
  
  // Computed to get the current individual person (readonly)
  readonly currentIndividualPerson = computed(() => this.currentIndividualPersonSignal());
  
  // Computed to get the current legal person (readonly)
  readonly currentLegalPerson = computed(() => this.currentLegalPersonSignal());
  
  // Computed to get the type of current person
  readonly currentPersonType = computed(() => {
    if (this.currentIndividualPersonSignal()) return 'individual';
    if (this.currentLegalPersonSignal()) return 'legal';
    return null;
  });
  
  // Method to set the current individual person
  setCurrentIndividualPerson(person: PersonDetails | null): void {
    // Clear the other type if setting a new person
    if (person) this.currentLegalPersonSignal.set(null);
    this.currentIndividualPersonSignal.set(person);
  }
  
  // Method to set the current legal person
  setCurrentLegalPerson(person: PersonLegalDetails | null): void {
    // Clear the other type if setting a new person
    if (person) this.currentIndividualPersonSignal.set(null);
    this.currentLegalPersonSignal.set(person);
  }
  
  // Method to clear current person
  clearCurrentPerson(): void {
    this.currentIndividualPersonSignal.set(null);
    this.currentLegalPersonSignal.set(null);
  }
  
  // Navigate to the current person's details
  navigateToCurrentPerson(): void {
    const individualPerson = this.currentIndividualPersonSignal();
    const legalPerson = this.currentLegalPersonSignal();
    
    if (individualPerson) {
      this.router.navigate(['/personnes', individualPerson.id]);
    } else if (legalPerson) {
      this.router.navigate(['/personnes-morales', legalPerson.id]);
    } else {
      console.warn('No current person to navigate to');
    }
  }
}