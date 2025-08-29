# Tag Component Documentation

## Installation et Utilisation

### Installation

```typescript
import { PshTagComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshTagComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Tag basique avec contenu par défaut
<psh-tag></psh-tag>

// Tag avec contenu et icône
<psh-tag icon="check">Vérifié</psh-tag>

// Tag fermable
<psh-tag 
  [closable]="true"
  (closed)="handleClose()"
>
  Tag fermable
</psh-tag>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| variant | TagVariant | 'primary' | Style du tag |
| size | TagSize | 'medium' | Taille du tag |
| closable | boolean | false | Tag fermable |
| disabled | boolean | false | État désactivé |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| icon | string | undefined | Icône Phosphor |
| closeLabel | string | 'Supprimer le tag' | Label du bouton de fermeture |
| content | string | 'Tag' | Contenu par défaut |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| clicked | EventEmitter<MouseEvent> | Émis lors du clic |
| closed | EventEmitter<void> | Émis lors de la fermeture |

## Configuration Globale

```typescript
@Component({
  providers: [
    {
      provide: TAG_CONFIG,
      useValue: {
        variant: 'primary',
        size: 'medium',
        closable: false,
        disabled: false
      }
    }
  ]
})
```

## Bonnes Pratiques

1. **Utilisation**
   - Choisir la variante appropriée selon le contexte
   - Limiter la longueur du contenu
   - Utiliser des icônes descriptives
   - Gérer les états désactivés

2. **Accessibilité**
   - Labels descriptifs
   - Support du clavier
   - États ARIA appropriés

3. **Performance**
   - Utilisation des signals
   - Détection de changements OnPush
   - Gestion efficace des états

4. **UX**
   - Feedback immédiat
   - Animations fluides
   - États visuels clairs