import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonDetails } from '../../models/person.model';
import { PshTableComponent } from '@lib/components/table/table.component';
import { TableColumn, TableRow } from '@lib/components/table/table.types';

@Component({
  selector: 'app-person-history-details',
  standalone: true,
  imports: [CommonModule, PshTableComponent],
  templateUrl: './person-history-details.component.html',
  styleUrls: ['./person-history-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonHistoryDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);

  personDetails = computed(() => {
    const personId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    return this.personService.getPersonById(personId);
  });

  historyColumns: TableColumn[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'event', label: 'Événement', sortable: true },
    { key: 'description', label: 'Description' },
    { key: 'user', label: 'Utilisateur', sortable: true }
  ];

  historyData = computed(() => {
    const person = this.personDetails();
    if (!person?.history) return [];

    return person.history.map((item, index) => ({
      id: index,
      date: new Date(item.date).toLocaleDateString('fr-FR'),
      event: item.event,
      description: item.description,
      user: item.user
    }));
  });


  ngOnInit(): void {
    // Component initialization
  }


  editHistory(): void {
    const personId = this.route.parent?.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'historique', 'edit']);
  }
}