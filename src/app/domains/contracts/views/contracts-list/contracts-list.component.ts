import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContractDataService } from '../../services/contract-data.service';
import { Contract } from '../../../person/models/contract.model';
import { PshInputComponent } from '@lib/components/input/input.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PshTableComponent } from '@lib/components/table/table.component';
import { TableColumn, TableRow } from '@lib/components/table/table.types';

@Component({
  selector: 'app-contracts-list',
  standalone: true,
  imports: [
    CommonModule,
    PshInputComponent,
    PshButtonComponent,
    PshTableComponent
  ],
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractsListComponent {
  private router = inject(Router);
  private contractService = inject(ContractDataService);

  // State
  private searchTermSignal = signal('');

  // Computed
  searchTerm = computed(() => this.searchTermSignal());

  contractsColumns: TableColumn[] = [
    { key: 'contractNumber', label: 'N° Contrat', sortable: true },
    { key: 'product', label: 'Produit', sortable: true },
    { key: 'status', label: 'Statut', sortable: true },
    { key: 'acquiredSavings', label: 'Épargne acquise', sortable: true },
    { key: 'startDate', label: 'Date d\'effet', sortable: true },
    { key: 'actions', label: 'Actions' }
  ];

  allContracts = computed(() => this.contractService.getAllContracts());

  filteredContracts = computed(() => {
    const contracts = this.allContracts();
    const searchTerm = this.searchTermSignal().toLowerCase();
    
    if (!searchTerm) return contracts;
    
    return contracts.filter(contract =>
      contract.contractNumber.toLowerCase().includes(searchTerm) ||
      contract.product.toLowerCase().includes(searchTerm) ||
      contract.status.toLowerCase().includes(searchTerm)
    );
  });

  contractsTableData = computed(() => {
    return this.filteredContracts().map(contract => ({
      id: contract.id,
      contractNumber: contract.contractNumber,
      product: contract.product,
      status: contract.status,
      acquiredSavings: `${contract.acquiredSavings.toLocaleString('fr-FR')}€`,
      startDate: contract.startDate.toLocaleDateString('fr-FR'),
      actions: contract.id
    }));
  });

  onSearch(term: string): void {
    this.searchTermSignal.set(term);
  }

  navigateToContract(row: TableRow): void {
    this.router.navigate(['/contrats', row.id]);
  }

  createContract(): void {
    // TODO: Navigate to create form
    console.log('Create new contract');
  }
}