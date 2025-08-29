import { Component, OnInit, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractDataService } from '../../services/contract-data.service';
import { Contract } from '../../../person/models/contract.model';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { InfoCardData } from '@lib/components/info-card/info-card.types';

@Component({
  selector: 'app-contract-view',
  standalone: true,
  imports: [CommonModule, PshInfoCardComponent, PshButtonComponent],
  templateUrl: './contract-view.component.html',
  styleUrls: ['./contract-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contractService = inject(ContractDataService);

  private contractSignal = signal<Contract | null>(null);

  contract = computed(() => this.contractSignal());

  contractData = computed(() => {
    const contract = this.contract();
    if (!contract) return [];

    const data: InfoCardData[] = [
      { label: 'Numéro de contrat', value: contract.contractNumber },
      { label: 'Produit', value: contract.product },
      { label: 'Statut', value: contract.status },
      { label: 'Épargne acquise', value: `${contract.acquiredSavings.toLocaleString('fr-FR')}€` },
      { label: 'Date d\'effet', value: contract.startDate.toLocaleDateString('fr-FR') },
      { label: 'Date de fin', value: contract.endDate ? contract.endDate.toLocaleDateString('fr-FR') : 'En cours' }
    ];

    return data;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const contractId = Number(params.get('id') || params.get('contractId'));
      if (contractId) {
        const contract = this.contractService.getContractById(contractId);
        this.contractSignal.set(contract || null);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/contrats']);
  }

  editContract(): void {
    // TODO: Navigate to edit mode
    console.log('Edit contract');
  }
}