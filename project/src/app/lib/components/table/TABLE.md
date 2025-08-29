# Table Component Documentation

## Installation et Utilisation

### Installation

```typescript
import { PshTableComponent, TableColumn, TableRow } from '@ps/helix';

@Component({
  // ...
  imports: [PshTableComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Définition des types
const columns: TableColumn[] = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
];

const data: TableRow[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Table basique avec contenu simple
<psh-table
  [columns]="columns"
  [data]="data"
></psh-table>

// Table avec templates personnalisés
<psh-table
  [columns]="[
    { key: 'name', label: 'Name' },
    { key: 'country', label: 'Country', template: countryTemplate },
    { key: 'agent', label: 'Agent', template: agentTemplate },
    { key: 'status', label: 'Status', template: statusTemplate }
  ]"
  [data]="data"
>
  <!-- Template pour la colonne country -->
  <ng-template #countryTemplate let-row>
    <div class="country-info">
      <img [src]="row.countryFlag" [alt]="row.country">
      {{ row.country }}
    </div>
  </ng-template>

  <!-- Template pour la colonne agent -->
  <ng-template #agentTemplate let-row>
    <div class="agent-info">
      <img [src]="row.agentAvatar" [alt]="row.agent" class="agent-avatar">
      {{ row.agent }}
    </div>
  </ng-template>

  <!-- Template pour la colonne status -->
  <ng-template #statusTemplate let-row>
    <psh-tag [variant]="row.statusVariant">
      {{ row.status }}
    </psh-tag>
  </ng-template>
</psh-table>

// Table avec recherche et messages personnalisés
<psh-table
  [columns]="columns"
  [data]="data"
  [globalSearch]="true"
  emptyMessage="Aucune donnée disponible"
  noResultsMessage="Aucun résultat trouvé pour"
  globalSearchPlaceholder="Rechercher..."
></psh-table>

// Table avec configuration par défaut
<psh-table pshDefaultTable></psh-table>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| variant | string | 'default' | Style de la table |
| size | string | 'medium' | Taille de la table |
| striped | boolean | false | Lignes alternées |
| hoverable | boolean | false | Effet au survol |
| bordered | boolean | false | Bordures |
| loading | boolean | false | État de chargement |
| globalSearch | boolean | false | Recherche globale |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| columns | TableColumn[] | [...] | Configuration des colonnes |
| data | TableRow[] | [...] | Données à afficher |
| emptyMessage | string | 'No data available' | Message quand aucune donnée |
| noResultsMessage | string | 'No results found' | Message quand recherche sans résultat |
| globalSearchPlaceholder | string | 'Search...' | Placeholder de recherche |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| sortChange | EventEmitter<TableSort> | Émis lors du tri |
| globalSearchChange | EventEmitter<string> | Émis lors de la recherche |

### Interface TableColumn
```typescript
interface TableColumn {
  key: string;      // Clé unique
  label: string;    // Label de la colonne
  width?: string;   // Largeur optionnelle
  sortable?: boolean; // Colonne triable
  /** Template personnalisé pour le contenu de la colonne */
  template?: TemplateRef<any>;
}
```

### Interface TableRow
```typescript
interface TableRow {
  id: string | number;  // Identifiant unique
  [key: string]: any;   // Données de la ligne
}
```

### Interface TableSort
```typescript
interface TableSort {
  key: string;      // Clé de la colonne
  direction: 'asc' | 'desc';  // Direction du tri
}
```

## Configuration Globale

```typescript
@Component({
  providers: [
    {
      provide: TABLE_CONFIG,
      useValue: {
        variant: 'default',
        size: 'medium',
        striped: false,
        hoverable: false,
        bordered: false,
        loading: false,
        globalSearch: false,
        emptyMessage: 'No data available',
        noResultsMessage: 'No results found',
        globalSearchPlaceholder: 'Search...'
      }
    }
  ]
})
```

## Gestion des Messages

La table gère deux types de messages vides distincts :

1. **Table sans données** (`emptyMessage`)
   - Affiché quand la table ne contient aucune donnée
   - Configurable via l'input `emptyMessage`
   - Exemple : "Aucune donnée disponible"

2. **Recherche sans résultat** (`noResultsMessage`)
   - Affiché quand la recherche ne trouve aucun résultat
   - Configurable via l'input `noResultsMessage`
   - Le terme recherché est automatiquement ajouté
   - Exemple : "Aucun résultat trouvé pour 'xyz'"

## Bonnes Pratiques

1. **Structure des Données**
   - Colonnes bien définies
   - Données cohérentes
   - IDs uniques
   - Templates flexibles

2. **Performance**
   - Utilisation des signals
   - Détection de changements OnPush
   - Tri et filtrage optimisés
   - Gestion efficace des états

3. **Accessibilité**
   - Labels descriptifs
   - Support du clavier
   - États ARIA appropriés
   - Tri accessible

4. **UX**
   - Feedback immédiat
   - Animations fluides
   - États visuels clairs
   - Recherche intuitive
   - Messages contextuels appropriés

## Templates Personnalisés

Le composant table permet de personnaliser le rendu de chaque colonne via des templates :

1. **Définition du Template**
   ```typescript
   columns: TableColumn[] = [
     { 
       key: 'status',
       label: 'Status',
       template: this.statusTemplate 
     }
   ];
   ```

2. **Création du Template**
   ```html
   <ng-template #statusTemplate let-row>
     <psh-tag [variant]="row.statusVariant">
       {{ row.status }}
     </psh-tag>
   </ng-template>
   ```

3. **Types de Contenu Supportés**
   - Composants (tags, badges, boutons)
   - Images (avatars, icônes, drapeaux)
   - Texte formaté
   - Icônes
   - HTML personnalisé
   - Autres composants Angular

4. **Contexte du Template**
   - Accès à la ligne complète via `let-row`
   - Possibilité d'utiliser toutes les propriétés de la ligne
   - Support des méthodes du composant

5. **Exemples d'Utilisation**
   ```typescript
   // Avatar avec nom
   <ng-template #userTemplate let-row>
     <div class="user-info">
       <img [src]="row.avatar" [alt]="row.name">
       <span>{{ row.name }}</span>
     </div>
   </ng-template>

   // Actions avec boutons
   <ng-template #actionsTemplate let-row>
     <div class="actions">
       <psh-button icon="edit" (click)="editUser(row)">
         Modifier
       </psh-button>
       <psh-button icon="trash" variant="danger">
         Supprimer
       </psh-button>
     </div>
   </ng-template>

   // Status avec tag
   <ng-template #statusTemplate let-row>
     <psh-tag [variant]="getStatusVariant(row.status)">
       {{ row.status }}
     </psh-tag>
   </ng-template>
   ```
## Configuration Globale

```typescript
@Component({
  providers: [
    {
      provide: TABLE_CONFIG,
      useValue: {
        variant: 'default',
        size: 'medium',
        striped: false,
        hoverable: false,
        bordered: false,
        loading: false,
        globalSearch: false,
        emptyMessage: 'No data available',
        noResultsMessage: 'No results found',
        globalSearchPlaceholder: 'Search...'
      }
    }
  ]
})
```