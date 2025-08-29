import { Component, input, model, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshInfoCardComponent } from '@lib/components/info-card/info-card.component';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { PersonDetails } from '../../models/person.model';
import { InfoCardData } from '@lib/components/info-card/info-card.types';

@Component({
  selector: 'person-civility-block',
  standalone: true,
  imports: [CommonModule, PshInfoCardComponent, PshButtonComponent],
  templateUrl: './person-civility-block.component.html',
  styleUrls: ['./person-civility-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCivilityBlockComponent {
  // Inputs
  person = input.required<PersonDetails>();
  editable = input(true);
  
  // Model
  editMode = model(false);
  
  // Outputs
  editRequested = output<void>();
  saveRequested = output<Partial<PersonDetails>>();
  
  // Computed
  civilityData = computed(() => {
    const person = this.person();
    const data: InfoCardData[] = [
      { label: 'Civilité', value: person.civility },
      { label: 'Prénom', value: person.firstName },
      { label: 'Nom', value: person.lastName },
      { label: 'Date de naissance', value: person.birthDate ? new Date(person.birthDate).toLocaleDateString('fr-FR') : 'Non renseignée' },
      { label: 'Lieu de naissance', value: person.birthPlace || 'Non renseigné' },
      { label: 'Nationalité', value: person.nationality || 'Non renseignée' },
      { label: 'Situation familiale', value: person.maritalStatus || 'Non renseignée' },
      { label: 'Régime matrimonial', value: person.matrimonialRegime || 'Non renseigné' }
    ];
    return data;
  });
  
  handleEdit(): void {
    if (this.editable()) {
      this.editRequested.emit();
    }
  }
  
  handleSave(): void {
    // TODO: Implement save logic
    this.saveRequested.emit({});
    this.editMode.set(false);
  }
  
  handleCancel(): void {
    this.editMode.set(false);
  }
}