import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshTagComponent } from '@lib/components/tag/tag.component';
import { Contract } from '../../models/contract.model';

@Component({
  selector: 'person-contract-card',
  standalone: true,
  imports: [CommonModule, PshTagComponent],
  templateUrl: './person-contract-card.component.html',
  styleUrls: ['./person-contract-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonContractCardComponent {
  // Inputs
  contract = input.required<Contract>();
  
  // Outputs
  contractClicked = output<Contract>();
  
  // Computed
  statusVariant = computed(() => {
    const status = this.contract().status;
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'closed': return 'secondary';
      default: return 'primary';
    }
  });
  
  statusLabel = computed(() => {
    const status = this.contract().status;
    switch (status) {
      case 'active': return 'En cours';
      case 'pending': return 'En attente';
      case 'closed': return 'Clôturé';
      default: return status;
    }
  });
  
  formattedSavings = computed(() => {
    return `${this.contract().acquiredSavings.toLocaleString('fr-FR')} €`;
  });
  
  handleClick(): void {
    this.contractClicked.emit(this.contract());
  }
}