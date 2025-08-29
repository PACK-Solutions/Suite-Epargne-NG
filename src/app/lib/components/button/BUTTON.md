# Button Component Documentation

## Installation et Utilisation

### Installation

```typescript
import { PshButtonComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshButtonComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Button basique
<psh-button>Mon bouton</psh-button>

// Button avec apparence et variante
<psh-button appearance="filled" variant="primary">
  Bouton Principal
</psh-button>

// Button avec icône
<psh-button
  appearance="filled"
  variant="primary"
  icon="arrow-right"
  iconPosition="right"
>
  Suivant
</psh-button>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| appearance | ButtonAppearance | 'filled' | Apparence du bouton |
| variant | ButtonVariant | 'primary' | Style du bouton |
| size | ButtonSize | 'medium' | Taille du bouton |
| disabled | boolean | false | État désactivé |
| loading | boolean | false | État de chargement |
| fullWidth | boolean | false | Largeur complète |
| iconPosition | ButtonIconPosition | 'left' | Position de l'icône |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| icon | string | undefined | Nom de l'icône Phosphor |
| ariaLabel | string | undefined | Label ARIA personnalisé |
| loadingText | string | 'Loading...' | Texte de chargement |
| disabledText | string | 'Unavailable' | Texte désactivé |
| iconOnlyText | string | undefined | Label pour icône seule |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| clicked | EventEmitter<MouseEvent> | Émis lors du clic |

### Types

```typescript
type ButtonAppearance = 'filled' | 'outline' | 'rounded' | 'text';
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonIconPosition = 'left' | 'right' | 'only';
```

## Apparences

### Filled
**Description**: Style par défaut avec fond plein.

**Cas d'utilisation**:
- Actions principales
- CTA
- Validation de formulaires

### Outline
**Description**: Style avec bordure sans fond.

**Cas d'utilisation**:
- Actions secondaires
- Options alternatives
- Interfaces épurées

### Rounded
**Description**: Style avec coins complètement arrondis.

**Cas d'utilisation**:
- Design moderne
- Interfaces ludiques
- Actions spéciales

### Text
**Description**: Style minimaliste sans fond ni bordure.

**Cas d'utilisation**:
- Navigation
- Actions tertiaires
- Menus

## États et Modificateurs

### Tailles
- `small`: Pour les interfaces denses (32px)
- `medium`: Taille par défaut (40px)
- `large`: Pour plus de visibilité (48px)

### États
- `disabled`: État désactivé
- `loading`: État de chargement
- `fullWidth`: Largeur complète

## Accessibilité

### Attributs ARIA
- `role="button"`: Rôle sémantique
- `aria-disabled`: État désactivé
- `aria-busy`: État de chargement
- `aria-label`: Description de l'action

### Bonnes Pratiques
- Labels descriptifs
- Support du clavier
- États visuels distincts
- Messages d'état vocaux

## Exemple Complet

```typescript
<psh-button
  appearance="filled"
  variant="primary"
  size="medium"
  icon="arrow-right"
  iconPosition="right"
  [disabled]="isDisabled"
  [loading]="isLoading"
  [fullWidth]="false"
  ariaLabel="Continuer vers la prochaine étape"
  (clicked)="handleClick($event)"
>
  Continuer
</psh-button>
```