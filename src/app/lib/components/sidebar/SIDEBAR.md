# Sidebar Component Documentation

## Installation et Utilisation

### Installation

```typescript
import { PshSidebarComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshSidebarComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Sidebar fixe
<psh-sidebar [open]="true" mode="fixed" width="250px">
  <psh-menu [items]="menuItems"></psh-menu>
</psh-sidebar>

// Sidebar overlay
<psh-sidebar 
  [open]="isOpen" 
  mode="overlay"
  (toggle)="handleToggle($event)"
>
  <psh-menu [items]="menuItems"></psh-menu>
</psh-sidebar>

// Sidebar pliable
<psh-sidebar 
  [open]="false" 
  mode="collapsible"
  width="250px"
>
  <psh-menu [items]="menuItems"></psh-menu>
</psh-sidebar>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| open | boolean | false | État d'ouverture |
| mode | SidebarMode | 'fixed' | Mode d'affichage |
| position | SidebarPosition | 'left' | Position |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| width | string | '250px' | Largeur de la sidebar |
| breakpoint | string | '768px' | Breakpoint mobile |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| toggle | EventEmitter<boolean> | Émis lors du toggle |

## Modes Disponibles

### Fixed
- Toujours visible
- Adapté aux layouts fixes
- Pas de superposition du contenu

### Overlay
- Se superpose au contenu
- Fermeture au clic extérieur
- Idéal pour mobile

### Collapsible
- Pliable/dépliable
- Mode compact par défaut
- Expansion au survol/clic

## Accessibilité

### Attributs ARIA
- `role="complementary"`: Rôle sémantique
- `aria-hidden`: État de visibilité
- `aria-expanded`: État d'expansion
- Support complet du clavier

### Navigation
- `Escape`: Ferme la sidebar (mode overlay)
- `Tab`: Navigation piégée dans la sidebar
- Focus géré automatiquement

## Responsive Design

- Passage automatique en mode overlay sur mobile
- Largeur adaptative
- Support des gestures tactiles
- Breakpoint configurable

## Configuration Globale

```typescript
@Component({
  providers: [
    {
      provide: SIDEBAR_CONFIG,
      useValue: {
        mode: 'fixed',
        position: 'left',
        width: '250px',
        breakpoint: '768px'
      }
    }
  ]
})
```

## Bonnes Pratiques

1. **Structure**
   - Contenu organisé et accessible
   - Navigation claire
   - Hiérarchie visuelle

2. **Performance**
   - Animations optimisées
   - Gestion efficace des états
   - Nettoyage des ressources

3. **UX**
   - Transitions fluides
   - Feedback visuel
   - Comportement intuitif
   - Support mobile