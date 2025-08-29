import { Component, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersonLegalService } from '../services/person-legal.service';
import { PersonLegalDetails } from '../models/person-legal.model';
import { PersonHeaderComponent, PersonHeaderData } from '../blocks/person-header/person-header.component';
import { CurrentPersonService } from '../../../core/context/current-person.service';
import { PshButtonComponent } from '../../../lib/components/button/button.component';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-person-legal-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PersonHeaderComponent,
    PshButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="person-legal-view">
      @if (headerData(); as data) {
        <person-header
          [personData]="data"
          (backRequested)="goBack()"
          (documentsRequested)="viewDocuments()"
        ></person-header>
      }

      <main class="view-content">
        @if (legalPerson(); as p) {
          <router-outlet></router-outlet>
        } @else if (isLoading()) {
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Chargement des informations...</p>
          </div>
        } @else {
          <div class="error-state">
            <h2>Entité non trouvée</h2>
            <p>L'entité demandée n'existe pas ou n'est plus accessible.</p>
            <psh-button (click)="goBack()">
              Retour à la liste
            </psh-button>
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .person-legal-view {
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
export class PersonLegalViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personLegalService = inject(PersonLegalService);
  private currentPersonService = inject(CurrentPersonService);

  legalPerson = signal<PersonLegalDetails | null>(null);
  isLoading = signal(true);
  private currentSubtitleSignal = signal<string>('');
  
  // Computed header data
  headerData = computed(() => {
    const person = this.legalPerson();
    if (!person) return null;
    
    const data: PersonHeaderData = {
      name: person.raisonSociale,
      type: 'legal',
      identifier: `#${person.id.toString().padStart(6, '0')}`
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
      this.loadLegalPerson(personId);
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

  private loadLegalPerson(id: string) {
    this.isLoading.set(true);
    try {
      const person = this.personLegalService.getLegalPersonById(Number(id));
      this.legalPerson.set(person || null);
      
      // Set current legal person in context
      if (person) {
        this.currentPersonService.setCurrentLegalPerson(person);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'entité:', error);
      this.legalPerson.set(null);
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
    this.router.navigate(['/personnes-morales', personId, 'documents']);
  }
}