# Card Component Documentation

## Installation et Utilisation

### Installation

```typescript
import { PshCardComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshCardComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Carte verticale (par défaut)
<psh-card>
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte</p>
</psh-card>

// Carte horizontale avec contenu latéral
<psh-card orientation="horizontal">
  <div card-side>
    <img src="image.jpg" alt="Image">
  </div>
  <div>
    <h3>Titre</h3>
    <p>Contenu principal</p>
  </div>
</psh-card>

// Carte avec en-tête et actions
<psh-card>
  <div card-header>
    <h3>Titre</h3>
    <psh-button>Action</psh-button>
  </div>
  <p>Contenu</p>
  <div card-actions>
    <psh-button>Annuler</psh-button>
    <psh-button>Confirmer</psh-button>
  </div>
</psh-card>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| variant | CardVariant | 'default' | Style de la carte |
| orientation | 'vertical' \| 'horizontal' | 'vertical' | Orientation de la carte |
| disabled | boolean | false | État désactivé |
| hoverable | boolean | false | Effet au survol |
| interactive | boolean | false | Carte cliquable |
| expanded | boolean | true | État d'expansion |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| columnGap | string | 'var(--spacing-md)' | Espacement entre colonnes |
| padding | string \| Record<string, string> | 'var(--spacing-md)' | Padding de la carte |
| minWidth | string | undefined | Largeur minimale |
| maxWidth | string | undefined | Largeur maximale |
| headerStyle | Record<string, string> | {} | Styles de l'en-tête |
| contentStyle | Record<string, string> | {} | Styles du contenu |
| footerStyle | Record<string, string> | {} | Styles du pied |
| sideStyle | Record<string, string> | {} | Styles du contenu latéral |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| clicked | EventEmitter<MouseEvent> | Émis lors du clic |
| expandedChange | EventEmitter<boolean> | Émis lors de l'expansion |

### Slots de Contenu
- `[card-header]` : En-tête de la carte
- `[card-side]` : Contenu latéral (images, icônes)
- `[card-actions]` : Actions de la carte
- Contenu par défaut : Corps de la carte

## Variants Overview

### Default Card
**Description**: Style par défaut avec fond blanc.

**Cas d'utilisation**:
- Contenu standard
- Interfaces claires
- Mise en page simple

### Outlined Card
**Description**: Style avec bordure.

**Cas d'utilisation**:
- Interfaces épurées
- Délimitation subtile
- Contraste léger

### Elevated Card
**Description**: Style avec ombre portée.

**Cas d'utilisation**:
- Contenu mis en avant
- Hiérarchie visuelle
- Interfaces modernes

## Orientations

### Vertical (par défaut)
**Description**: Empile les éléments verticalement.

**Cas d'utilisation**:
- Cartes produit
- Articles de blog
- Fiches détaillées

### Horizontal
**Description**: Dispose les éléments horizontalement.

**Cas d'utilisation**:
- Cartes de statistiques
- Profils utilisateur
- Aperçus rapides

## Exemples d'Utilisation

### Carte de Statistiques (Horizontale)
```typescript
<psh-card orientation="horizontal">
  <div card-side>
    <i class="ph ph-trending-up"></i>
  </div>
  <div>
    <h3>8,430€</h3>
    <p>Revenu mensuel</p>
    <psh-tag variant="success">+12.6%</psh-tag>
  </div>
</psh-card>
```

### Carte Produit (Verticale)
```typescript
<psh-card variant="outlined">
  <div card-side>
    <img src="product.jpg" alt="Produit">
  </div>
  <h3>Nom du Produit</h3>
  <p>Description du produit</p>
  <div class="price">199.99€</div>
  <div card-actions>
    <psh-button>Ajouter au panier</psh-button>
  </div>
</psh-card>
```

### Carte Profil (Horizontale)
```typescript
<psh-card orientation="horizontal">
  <div card-side>
    <psh-avatar src="avatar.jpg"></psh-avatar>
  </div>
  <div>
    <h3>John Doe</h3>
    <p>Senior Developer</p>
    <div card-actions>
      <psh-button>Message</psh-button>
    </div>
  </div>
</psh-card>
```

## Bonnes Pratiques

1. **Structure du Contenu**
   - Utiliser les slots appropriés
   - Maintenir une hiérarchie claire
   - Adapter l'orientation au contenu
   - Gérer les débordements

2. **Accessibilité**
   - Titres descriptifs
   - Images avec alt
   - États interactifs clairs
   - Support du clavier

3. **Performance**
   - Utilisation des signals
   - Détection de changements OnPush
   - Optimisation des images
   - Gestion efficace des états

4. **Responsive Design**
   - Adaptation de l'orientation
   - Images responsives
   - Contenu flexible
   - Breakpoints appropriés

5. **Styles**
   - Variables CSS cohérentes
   - Thèmes supportés
   - Transitions fluides
   - États visuels clairs