import { Injectable, signal } from '@angular/core';
import { Contract } from '../../person/models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractDataService {
  private contractsSignal = signal<Contract[]>([
    {
      id: 101,
      contractNumber: 'CTR-2024-001',
      personId: 1,
      product: 'PER Individuel',
      acquiredSavings: 25000,
      status: 'active',
      startDate: new Date('2020-01-15')
    },
    {
      id: 102,
      contractNumber: 'CTR-2024-002',
      personId: 1,
      product: 'Assurance Vie',
      acquiredSavings: 45000,
      status: 'active',
      startDate: new Date('2018-06-10')
    },
    {
      id: 201,
      contractNumber: 'CTR-2024-003',
      personId: 2,
      product: 'PER Collectif',
      acquiredSavings: 15000,
      status: 'active',
      startDate: new Date('2022-03-01')
    },
    {
      id: 301,
      contractNumber: 'CTR-ENT-2024-001',
      personId: 1,
      product: 'PER Collectif Entreprise',
      acquiredSavings: 150000,
      status: 'active',
      startDate: new Date('2021-01-01')
    }
  ]);

  getAllContracts(): Contract[] {
    return this.contractsSignal();
  }

  getContractById(id: number): Contract | undefined {
    return this.contractsSignal().find(contract => contract.id === id);
  }

  createContract(contract: Omit<Contract, 'id'>): Contract {
    const newId = Math.max(...this.contractsSignal().map(c => c.id)) + 1;
    const newContract: Contract = { ...contract, id: newId };
    this.contractsSignal.update(contracts => [...contracts, newContract]);
    return newContract;
  }

  updateContract(id: number, updates: Partial<Contract>): Contract | undefined {
    const contractIndex = this.contractsSignal().findIndex(c => c.id === id);
    if (contractIndex === -1) return undefined;

    this.contractsSignal.update(contracts => {
      const updated = [...contracts];
      
      // Update properties individually to maintain type safety
      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && value !== undefined) {
          (updated[contractIndex] as any)[key] = value;
        }
      });
      
      return updated;
    });
    return this.contractsSignal()[contractIndex];
  }

  deleteContract(id: number): boolean {
    const initialLength = this.contractsSignal().length;
    this.contractsSignal.update(contracts => contracts.filter(c => c.id !== id));
    return this.contractsSignal().length < initialLength;
  }
}