# Pagination Component

Le composant Pagination permet de naviguer à travers une liste de pages de manière accessible et intuitive.

## Installation

```typescript
import { PshPaginationComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshPaginationComponent]
})
```

## Utilisation

### Basique
```html
<psh-pagination
  [currentPage]="1"
  [totalPages]="10"
  (pageChange)="onPageChange($event)"
></psh-pagination>
```

### Avec sélecteur d'éléments par page
```html
<psh-pagination
  [currentPage]="1"
  [totalPages]="10"
  [showItemsPerPage]="true"
  [itemsPerPage]="10"
  [itemsPerPageOptions]="[5, 10, 25, 50]"
  (itemsPerPageChange)="onItemsPerPageChange($event)"
></psh-pagination>
```

### Variante outline
```html
<psh-pagination
  [currentPage]="1"
  [totalPages]="10"
  variant="outline"
></psh-pagination>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| currentPage | number | 1 | Page actuelle |
| totalPages | number | 1 | Nombre total de pages |
| size | PaginationSize | 'medium' | Taille ('small', 'medium', 'large') |
| variant | PaginationVariant | 'default' | Style ('default', 'outline') |
| showFirstLast | boolean | true | Affiche les boutons premier/dernier |
| showPrevNext | boolean | true | Affiche les boutons précédent/suivant |
| maxVisiblePages | number | 5 | Nombre maximum de pages visibles |
| showItemsPerPage | boolean | false | Affiche le sélecteur d'éléments par page |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| itemsPerPage | number | 10 | Nombre d'éléments par page |
| itemsPerPageOptions | number[] | [5,10,25,50] | Options du sélecteur |
| firstLabel | string | 'First' | Label du bouton premier |
| previousLabel | string | 'Previous' | Label du bouton précédent |
| nextLabel | string | 'Next' | Label du bouton suivant |
| lastLabel | string | 'Last' | Label du bouton dernier |
| pageLabel | string | 'Page' | Label pour les pages |
| itemsLabel | string | 'items' | Label pour les éléments |
| itemsPerPageLabel | string | 'Items per page' | Label du sélecteur |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| pageChange | EventEmitter<number> | Émis lors du changement de page |
| itemsPerPageChange | EventEmitter<number> | Émis lors du changement d'éléments par page |

## Accessibilité

- Support complet des attributs ARIA
- Navigation au clavier
- Labels descriptifs pour les boutons
- Rôles sémantiques appropriés

## Exemple Complet

```typescript
import { Component } from '@angular/core';
import { PshPaginationComponent } from '@ps/helix';

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [PshPaginationComponent],
  template: `
    <psh-pagination
      [(currentPage)]="currentPage"
      [totalPages]="totalPages"
      [showItemsPerPage]="true"
      [itemsPerPage]="itemsPerPage"
      variant="outline"
      size="medium"
      (pageChange)="handlePageChange($event)"
      (itemsPerPageChange)="handleItemsPerPageChange($event)"
      firstLabel="Premier"
      previousLabel="Précédent"
      nextLabel="Suivant"
      lastLabel="Dernier"
      pageLabel="Page"
      itemsLabel="éléments"
      itemsPerPageLabel="Éléments par page"
    ></psh-pagination>
  `
})
export class PaginationDemoComponent {
  currentPage = 1;
  totalPages = 10;
  itemsPerPage = 10;

  handlePageChange(page: number) {
    console.log('Page changed:', page);
  }

  handleItemsPerPageChange(items: number) {
    console.log('Items per page changed:', items);
  }
}
```

## Bonnes Pratiques

1. **Calcul des Pages Visibles**
   - Utilisation de computed pour optimiser les calculs
   - Gestion intelligente des bornes
   - Affichage adaptatif selon l'espace disponible

2. **Accessibilité**
   - Labels descriptifs pour chaque bouton
   - Support complet du clavier
   - États désactivés correctement gérés
   - Rôles ARIA appropriés

3. **Performance**
   - Utilisation des signals pour la réactivité
   - Détection de changements OnPush
   - Calculs optimisés des pages visibles

4. **Personnalisation**
   - Styles configurables via CSS variables
   - Labels personnalisables
   - Variantes visuelles adaptables
   - Configuration flexible des options