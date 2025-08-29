# Dropdown Component

Le composant Dropdown permet de créer des menus déroulants personnalisables et accessibles.

## Installation

```typescript
import { LibDropdownComponent } from '@ps/helix';

@Component({
  // ...
  imports: [LibDropdownComponent]
})
```

## Utilisation

### Approche Recommandée (avec contenu personnalisé)
```typescript
<lib-dropdown variant="primary">
  <span dropdown-trigger>{{ 'DROPDOWN.TITLE' | translate }}</span>
  <div dropdown-menu>
    <button class="dropdown-item" (click)="handleSelect('1')">
      {{ 'DROPDOWN.OPTIONS.OPTION1' | translate }}
    </button>
    <button class="dropdown-item" (click)="handleSelect('2')">
      {{ 'DROPDOWN.OPTIONS.OPTION2' | translate }}
    </button>
  </div>
</lib-dropdown>
```

### Alternative (avec l'API items)
```typescript
<lib-dropdown
  [items]="[
    { content: 'Option 1', value: '1' },
    { content: 'Option 2', value: '2', icon: 'check' }
  ]"
  (selected)="handleSelect($event)"
></lib-dropdown>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| variant | string | 'primary' | Style du dropdown |
| size | DropdownSize | 'medium' | Taille du dropdown |
| placement | DropdownPlacement | 'bottom-start' | Position du menu |
| disabled | boolean | false | État désactivé |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| items | DropdownItem[] | [] | Liste des éléments |
| label | string | '' | Label du bouton |
| icon | string | undefined | Icône du bouton |
| ariaLabel | string | undefined | Label ARIA |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| selected | EventEmitter<DropdownItem> | Émis lors de la sélection |
| opened | EventEmitter<void> | Émis à l'ouverture |
| closed | EventEmitter<void> | Émis à la fermeture |

### Interface DropdownItem
```typescript
interface DropdownItem<T = string> {
  content: string;    // Contenu à afficher
  value: T;          // Valeur associée
  icon?: string;     // Icône optionnelle
  disabled?: boolean; // État désactivé
  active?: boolean;  // État actif
}
```

## Bonnes Pratiques

1. **Utilisation des Slots**
   - Préférer l'utilisation des slots `dropdown-trigger` et `dropdown-menu` pour un contrôle total sur le contenu
   - Permet une meilleure gestion des traductions
   - Offre plus de flexibilité pour le style

2. **Gestion des Traductions**
   - Gérer les traductions au niveau du template avec le pipe translate
   - Éviter d'utiliser des clés de traduction dans les items

3. **Accessibilité**
   - Fournir des labels ARIA appropriés
   - Supporter la navigation au clavier
   - Gérer correctement les états désactivés

4. **Performance**
   - Utiliser la détection de changements OnPush
   - Éviter les calculs inutiles dans les templates
   - Nettoyer les souscriptions