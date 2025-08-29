# Badge Component Documentation

## Installation et Utilisation

### Installation

```bash
npm install @ps/helix
```

### Import du Composant

```typescript
import { PshBadgeComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshBadgeComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Badge numérique
<psh-badge
  variant="primary"
  [value]="5"
  displayType="counter"
  ariaLabel="5 notifications non lues"
></psh-badge>

// Badge avec formatter personnalisé
<psh-badge
  variant="primary"
  [value]="price"
  [formatter]="priceFormatter"
  ariaLabel="Prix: 42.99€"
>
  {{ price }}€
</psh-badge>

// Badge point de statut
<psh-badge
  variant="success"
  displayType="dot"
  ariaLabel="Statut: actif"
></psh-badge>

// Badge avec chevauchement
<div style="position: relative">
  <i class="ph ph-bell"></i>
  <psh-badge
    variant="danger"
    [value]="3"
    [overlap]="true"
    position="top-right"
    ariaLabel="3 notifications urgentes"
  ></psh-badge>
</div>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| variant | BadgeVariant | 'primary' | Style du badge |
| size | BadgeSize | 'medium' | Taille du badge |
| displayType | BadgeDisplayType | 'text' | Type d'affichage |
| content | string | '' | Contenu textuel |
| visible | boolean | true | Visibilité du badge |
| value | T | undefined | Valeur à afficher |
| max | number | 99 | Valeur maximum |
| showZero | boolean | false | Afficher la valeur zéro |
| position | BadgePosition | 'top-right' | Position du badge |

### Regular Inputs (@input)
| Nom | Type | Description |
|-----|------|-------------|
| overlap | boolean | Chevauchement sur l'élément parent |
| ariaLabel | string | Label ARIA personnalisé |
| formatter | (value: T) => string | Fonction de formatage personnalisée |

### Types

```typescript
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type BadgeSize = 'small' | 'medium' | 'large';
type BadgeDisplayType = 'dot' | 'counter' | 'text';
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
```

## Configuration par Défaut

Le composant Badge inclut une configuration par défaut intégrée :

```typescript
const DEFAULT_CONFIG = {
  variant: 'primary',
  size: 'medium',
  displayType: 'text',
  max: 99,
  showZero: false,
  position: 'top-right'
};
```

## Variants Overview

### Counter Badge
**Description**: Badge numérique pour afficher des compteurs.

**Cas d'utilisation**:
- Nombre de notifications
- Messages non lus
- Éléments dans un panier

### Dot Badge
**Description**: Badge en forme de point pour indiquer un statut.

**Cas d'utilisation**:
- Indicateur de statut en ligne/hors ligne
- État de disponibilité
- Notifications simples

### Text Badge
**Description**: Badge textuel pour afficher des labels.

**Cas d'utilisation**:
- Étiquettes de statut
- Labels informatifs
- Indicateurs textuels

## États et Modificateurs

### Tailles
- `small`: Pour les interfaces denses
- `medium`: Taille par défaut
- `large`: Pour plus de visibilité

### Positions (avec overlap)
- `top-right`: En haut à droite (défaut)
- `top-left`: En haut à gauche
- `bottom-right`: En bas à droite
- `bottom-left`: En bas à gauche

### États
- `visible`: Contrôle la visibilité
- `overlap`: Pour le positionnement absolu
- `showZero`: Affichage des valeurs nulles

## Accessibilité

### Attributs ARIA
- `role="status"`: Pour les badges numériques
- `role="img"`: Pour les badges de type point
- `aria-label`: Description détaillée du badge

### Bonnes Pratiques
- Fournir des descriptions claires via aria-label
- Utiliser des contrastes suffisants
- Assurer la lisibilité des valeurs

## Bonnes Pratiques

1. **Hiérarchie Visuelle**
   - Utiliser les variantes sémantiques appropriées
   - Maintenir une cohérence dans l'utilisation
   - Limiter le nombre de badges par vue

2. **Accessibilité**
   - Fournir des textes descriptifs
   - Utiliser des contrastes suffisants
   - Support des lecteurs d'écran

3. **Responsive Design**
   - Adapter la taille selon le contexte
   - Gérer le chevauchement sur mobile
   - Maintenir la lisibilité

4. **Performance**
   - Utilisation des signals pour la réactivité
   - Gestion efficace des états
   - Détection de changements OnPush