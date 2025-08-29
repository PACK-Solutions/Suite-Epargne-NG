import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PersonContractCardComponent } from '../../components/person-contract-card/person-contract-card.component';
import { PersonDetails } from '../../models/person.model';
import { Contract } from '../../models/contract.model';

@Component({
  selector: 'person-contracts-block',
  standalone: true,
  imports: [CommonModule, PshButtonComponent, PersonContractCardComponent],
  templateUrl: './person-contracts-block.component.html',
  styleUrls: ['./person-contracts-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonContractsBlockComponent {
  // Inputs
  person = input.required<PersonDetails>();
  showActions = input(true);
  
  // Outputs
  contractSelected = output<Contract>();
  newContractRequested = output<void>();

  // Computed
  contracts = computed(() => this.person().contracts || []);
  hasContracts = computed(() => (this.person().contracts?.length || 0) > 0);

  handleContractClick(contract: Contract): void {
    this.contractSelected.emit(contract);
  }

  handleNewContract(): void {
    this.newContractRequested.emit();
  }
}