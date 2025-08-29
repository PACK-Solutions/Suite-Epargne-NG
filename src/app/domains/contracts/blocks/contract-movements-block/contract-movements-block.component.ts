import { Component, input, output, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshTableComponent } from '@lib/components/table/table.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PshCardComponent } from '@lib/components/card/card.component';
import { PshTagComponent } from '@lib/components/tag/tag.component';
import { Contract } from '../../../person/models/contract.model';
import { TableColumn, TableRow } from '@lib/components/table/table.types';

export interface ContractMovement {
  id: number;
  date: Date;
  type: 'versement' | 'arbitrage' | 'rachat' | 'frais';
  description: string;
  amount: number;
  balance: number;
  status: 'completed' | 'pending' | 'cancelled';
}

@Component({
  selector: 'contract-movements-block',
  standalone: true,
  imports: [CommonModule, PshTableComponent, PshButtonComponent, PshCardComponent, PshTagComponent],
  templateUrl: './contract-movements-block.component.html',
  styleUrls: ['./contract-movements-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractMovementsBlockComponent {
  // Inputs
  contract = input.required<Contract>();
  showActions = input(true);
  
  // Outputs
  movementSelected = output<ContractMovement>();
  newMovementRequested = output<void>();
  
  // State
  private movementsSignal = signal<ContractMovement[]>([
    {
      id: 1,
      date: new Date('2024-01-15'),
      type: 'versement',
      description: 'Versement initial',
      amount: 5000,
      balance: 25000,
      status: 'completed'
    },
    {
      id: 2,
      date: new Date('2024-02-15'),
      type: 'arbitrage',
      description: 'Arbitrage vers fonds sécurisé',
      amount: 0,
      balance: 25000,
      status: 'completed'
    },
    {
      id: 3,
      date: new Date('2024-03-01'),
      type: 'frais',
      description: 'Frais de gestion trimestriel',
      amount: -75,
      balance: 24925,
      status: 'completed'
    }
  ]);
  
  // Table configuration
  movementsColumns: TableColumn[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'amount', label: 'Montant', sortable: true },
    { key: 'balance', label: 'Solde', sortable: true },
    { key: 'status', label: 'Statut', sortable: true }
  ];
  
  // Computed
  movements = computed(() => this.movementsSignal());
  
  movementsData = computed(() => {
    return this.movements().map(movement => ({
      id: movement.id,
      date: movement.date.toLocaleDateString('fr-FR'),
      type: this.getTypeLabel(movement.type),
      description: movement.description,
      amount: this.formatAmount(movement.amount),
      balance: `${movement.balance.toLocaleString('fr-FR')}€`,
      status: this.getStatusLabel(movement.status)
    }));
  });
  
  private getTypeLabel(type: string): string {
    switch (type) {
      case 'versement': return 'Versement';
      case 'arbitrage': return 'Arbitrage';
      case 'rachat': return 'Rachat';
      case 'frais': return 'Frais';
      default: return type;
    }
  }
  
  private getStatusLabel(status: string): string {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  }
  
  private formatAmount(amount: number): string {
    const formatted = `${Math.abs(amount).toLocaleString('fr-FR')}€`;
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  }
  
  handleRowClick(row: TableRow): void {
    const movement = this.movements().find(m => m.id === row.id);
    if (movement) {
      this.movementSelected.emit(movement);
    }
  }
  
  handleNewMovement(): void {
    this.newMovementRequested.emit();
  }
}