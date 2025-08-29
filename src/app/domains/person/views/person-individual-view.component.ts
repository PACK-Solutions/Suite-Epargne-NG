import { Component, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersonService } from '../services/person.service';
import { PersonDetails } from '../models/person.model';
import { PersonHeaderComponent, PersonHeaderData } from '../blocks/person-header/person-header.component';
import { CurrentPersonService } from '../../../core/context/current-person.service';
import { PshButtonComponent } from '../../../lib/components/button/button.component';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-person-individual-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PersonHeaderComponent,
    PshButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="person-individual-view">
      @if (headerData(); as data) {
        <person-header
          [personData]="data"
          (backRequested)="goBack()"
          (documentsRequested)="viewDocuments()"
        ></person-header>
      }

      <main class="view-content">
        @if (person(); as p) {
          <router-outlet></router-outlet>
        } @else if (isLoading()) {
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Chargement des informations...</p>
          </div>
        } @else {
          <div class="error-state">
            <h2>Personne non trouvée</h2>
            <p>La personne demandée n'existe pas ou n'est plus accessible.</p>
            <psh-button (click)="goBack()">
              Retour à la liste
            </psh-button>
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .person-individual-view {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .view-content {
      flex: 1;
      overflow: auto;
    }

    .loading-state,
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3rem;
      gap: 1rem;
    }

    .spinner {
      width: 2rem;
      height: 2rem;
      border: 2px solid var(--surface-border);
      border-top: 2px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-state h2 {
      color: var(--text-color);
      margin: 0;
    }

    .error-state p {
      color: var(--text-color-secondary);
      margin: 0;
    }
  `]
})
export class PersonIndividualViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personService = inject(PersonService);
  private currentPersonService = inject(CurrentPersonService);

  person = signal<PersonDetails | null>(null);
  isLoading = signal(true);
  private currentSubtitleSignal = signal<string>('');
  
  // Computed header data
  headerData = computed(() => {
    const person = this.person();
    if (!person) return null;
    
    const data: PersonHeaderData = {
      name: `${person.firstName} ${person.lastName}`,
      type: 'individual',
      identifier: `#${person.id.toString().padStart(6, '0')}`,
      deathStatus: person.deathStatus || null
    };
    
    return data;
  });

  constructor() {
    // Listen to navigation events to update subtitle based on active child route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data['title'] || '';
      }),
      takeUntilDestroyed()
    ).subscribe(title => {
      this.currentSubtitleSignal.set(title);
    });
  }

  ngOnInit() {
    const personId = this.route.snapshot.paramMap.get('id');
    if (personId) {
      this.loadPerson(personId);
    } else {
      this.isLoading.set(false);
    }
    
    // Get initial subtitle from current route
    let child = this.route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    const initialTitle = child?.snapshot.data['title'] || '';
    this.currentSubtitleSignal.set(initialTitle);
  }

  private loadPerson(id: string) {
    this.isLoading.set(true);
    try {
      const person = this.personService.getPersonById(Number(id));
      this.person.set(person || null);
      
      // Set current person in context
      if (person) {
        this.currentPersonService.setCurrentIndividualPerson(person);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la personne:', error);
      this.person.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack() {
    this.currentPersonService.clearCurrentPerson();
    this.router.navigate(['/personnes']);
  }

  viewDocuments() {
    const personId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/personnes', personId, 'documents']);
  }
}