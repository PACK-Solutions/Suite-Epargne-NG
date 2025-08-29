import { Routes } from '@angular/router';
import { DashboardComponent } from './domains/dashboard/views/dashboard.component';
import { GlobalPersonsComponent } from './domains/person/views/global-persons/global-persons.component';
// Person Views
import { PersonIndividualViewComponent } from './domains/person/views/person-individual-view.component';
import { PersonLegalViewComponent } from './domains/person/views/person-legal-view.component';

// Person Individual Components - Import from their actual current location
import { PersonGeneralInfoComponent } from './domains/person/components/person-general-info/person-general-info.component';
import { PersonCivilityDetailsReadComponent } from './domains/person/components/person-civility-details-read/person-civility-details-read.component';
import { PersonAddressDetailsReadComponent } from './domains/person/components/person-address-details-read/person-address-details-read.component';
import { PersonTaxDetailsReadComponent } from './domains/person/components/person-tax-details-read/person-tax-details-read.component';
import { PersonBankingDetailsReadComponent } from './domains/person/components/person-banking-details-read/person-banking-details-read.component';
import { PersonHistoryDetailsComponent } from './domains/person/components/person-history-details/person-history-details.component';
import { DocumentViewerComponent } from '@lib/components/document-viewer/document-viewer.component';

// Contract Views
import { ContractsListComponent } from './domains/contracts/views/contracts-list/contracts-list.component';
import { ContractViewComponent } from './domains/contracts/views/contract-view/contract-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'personnes',
    component: GlobalPersonsComponent,
    data: { title: 'Personnes' }
  },
  // Individual person routes with children
  {
    path: 'personnes/:id',
    component: PersonIndividualViewComponent,
    data: { title: 'Détails de la personne' },
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full'
      },
      {
        path: 'general',
        component: PersonGeneralInfoComponent,
        data: { title: 'Vue générale' }
      },
      {
        path: 'civilite',
        component: PersonCivilityDetailsReadComponent,
        data: { title: 'Informations de civilité' }
      },
      {
        path: 'adresse',
        component: PersonAddressDetailsReadComponent,
        data: { title: 'Adresses et Communication' }
      },
      {
        path: 'taxinfo',
        component: PersonTaxDetailsReadComponent,
        data: { title: 'Informations fiscales' }
      },
      {
        path: 'banking',
        component: PersonBankingDetailsReadComponent,
        data: { title: 'Coordonnées bancaires' }
      },
      {
        path: 'history',
        component: PersonHistoryDetailsComponent,
        data: { title: 'Historique' }
      },
      {
        path: 'documents',
        component: DocumentViewerComponent,
        data: { title: 'Documents' }
      }
    ]
  },
  // Legal person routes with children
  {
    path: 'personnes-morales/:id',
    component: PersonLegalViewComponent,
    data: { title: 'Détails de l\'entité' },
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full'
      },
      {
        path: 'general',
        component: PersonGeneralInfoComponent,
        data: { title: 'Vue générale' }
      },
      {
        path: 'civilite',
        component: PersonGeneralInfoComponent,
        data: { title: 'Informations de l\'entité' }
      },
      {
        path: 'adresse',
        component: PersonAddressDetailsReadComponent,
        data: { title: 'Adresses et Communication' }
      },
      {
        path: 'taxinfo',
        component: PersonTaxDetailsReadComponent,
        data: { title: 'Informations fiscales' }
      },
      {
        path: 'banking',
        component: PersonBankingDetailsReadComponent,
        data: { title: 'Coordonnées bancaires' }
      },
      {
        path: 'history',
        component: PersonHistoryDetailsComponent,
        data: { title: 'Historique' }
      },
      {
        path: 'documents',
        component: DocumentViewerComponent,
        data: { title: 'Documents' }
      }
    ]
  },
  // Contract routes
  {
    path: 'contrats/:id',
    component: ContractViewComponent,
    data: { title: 'Détails du contrat' }
  },
  {
    path: 'personnes/:personId/contrats/:contractId',
    component: ContractViewComponent,
    data: { title: 'Contrat de la personne' }
  },
  {
    path: 'personnes-morales/:personId/contrats/:contractId',
    component: ContractViewComponent,
    data: { title: 'Contrat de l\'entité' }
  },
  {
    path: 'contrats',
    component: ContractsListComponent,
    data: { title: 'Contrats' }
  },
  {
    path: 'rentes',
    component: DashboardComponent,
    data: { title: 'Rentes' }
  },
  {
    path: 'deces',
    component: DashboardComponent,
    data: { title: 'Décès' }
  }
];