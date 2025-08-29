import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../../domains/person/models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentContractService {
  private router = inject(Router);
  
  // Signal for the current contract
  private currentContractSignal = signal<Contract | null>(null);
  
  // Computed to check if there's a current contract
  readonly hasCurrentContract = computed(() => this.currentContractSignal() !== null);
  
  // Computed to get the current contract (readonly)
  readonly currentContract = computed(() => this.currentContractSignal());
  
  // Method to set the current contract
  setCurrentContract(contract: Contract | null): void {
    this.currentContractSignal.set(contract);
  }
  
  // Method to clear current contract
  clearCurrentContract(): void {
    this.currentContractSignal.set(null);
  }
  
  // Navigate to the current contract's details
  navigateToCurrentContract(): void {
    const contract = this.currentContractSignal();
    
    if (contract) {
      this.router.navigate(['/contrats', contract.id]);
    } else {
      console.warn('No current contract to navigate to');
    }
  }
  
  // Navigate to the current contract in the context of its person
  navigateToContractWithPerson(personId: number): void {
    const contract = this.currentContractSignal();
    
    if (contract && personId) {
      this.router.navigate(['/personnes', personId, 'contrats', contract.id]);
    } else {
      console.warn('Missing person ID or contract for navigation');
    }
  }
}