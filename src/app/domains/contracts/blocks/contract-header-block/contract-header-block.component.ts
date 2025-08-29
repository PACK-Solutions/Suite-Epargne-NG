import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshCardComponent } from '@lib/components/card/card.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PshTagComponent } from '@lib/components/tag/tag.component';
import { Contract } from '../../../person/models/contract.model';

@Component({
  selector: 'contract-header-block',
  standalone: true,
  imports: [CommonModule, PshCardComponent, PshButtonComponent, PshTagComponent],
  templateUrl: './contract-header-block.component.html',
  styleUrls: ['./contract-header-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractHeaderBlockComponent {
  // Inputs
  contract = input.required<Contract>();
  showActions = input(true);
  
  // Outputs
  editRequested = output<void>();
  printRequested = output<void>();
  exportRequested = output<void>();
  
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
      case 'active': return 'Actif';
      case 'pending': return 'En attente';
      case 'closed': return 'Clôturé';
      default: return status;
    }
  });
  
  formattedSavings = computed(() => {
    return `${this.contract().acquiredSavings.toLocaleString('fr-FR')}€`;
  });
  
  formattedStartDate = computed(() => {
    return this.contract().startDate.toLocaleDateString('fr-FR');
  });
  
  handleEdit(): void {
    this.editRequested.emit();
  }
  
  handlePrint(): void {
    this.printRequested.emit();
  }
  
  handleExport(): void {
    this.exportRequested.emit();
  }
}