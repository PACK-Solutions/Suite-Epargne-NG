import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PshTagComponent } from '@lib/components/tag/tag.component';

export interface PersonHeaderData {
  name: string;
  type: 'individual' | 'legal';
  identifier: string;
  deathStatus?: 'deceased' | 'suspected_death' | null;
}

@Component({
  selector: 'person-header',
  standalone: true,
  imports: [CommonModule, PshButtonComponent, PshTagComponent],
  templateUrl: './person-header.component.html',
  styleUrls: ['./person-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonHeaderComponent {
  // Inputs
  personData = input.required<PersonHeaderData>();
  showActions = input(true);
  
  // Outputs
  backRequested = output<void>();
  documentsRequested = output<void>();
  
  // Computed
  deathStatusVariant = computed(() => {
    const status = this.personData().deathStatus;
    switch (status) {
      case 'deceased': return 'danger';
      case 'suspected_death': return 'warning';
      default: return 'primary';
    }
  });
  
  deathStatusLabel = computed(() => {
    const status = this.personData().deathStatus;
    switch (status) {
      case 'deceased': return 'Décédée';
      case 'suspected_death': return 'Suspicion de décès';
      default: return '';
    }
  });
  
  deathStatusIcon = computed(() => {
    const status = this.personData().deathStatus;
    switch (status) {
      case 'deceased': return 'cross';
      case 'suspected_death': return 'warning';
      default: return '';
    }
  });
  
  // Event handlers
  handleBack(): void {
    this.backRequested.emit();
  }
  
  handleDocuments(): void {
    this.documentsRequested.emit();
  }
}