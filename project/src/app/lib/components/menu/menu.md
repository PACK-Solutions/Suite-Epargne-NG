# Menu Component Documentation

## Installation et Utilisation

### Installation

1. Installer le package via npm :
```bash
npm install @ps/helix
```

2. Importer le composant dans votre module ou composant standalone :
```typescript
import { PshMenuComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshMenuComponent],
  // ...
})
```

### Utilisation de Base

```typescript
@Component({
  template: `
    <!-- Menu basique -->
    <psh-menu
      [items]="menuItems"
      (itemClick)="handleItemClick($event)"
    ></psh-menu>

    <!-- Menu horizontal -->
    <psh-menu
      [items]="menuItems"
      mode="horizontal"
    ></psh-menu>

    <!-- Menu pliable -->
    <psh-menu
      [items]="menuItems"
      [collapsible]="true"
      [(collapsed)]="isCollapsed"
    ></psh-menu>
  `
})
export class ExampleComponent {
  menuItems = [
    { id: 'home', content: 'Home', icon: 'house' },
    { 
      id: 'settings', 
      content: 'Settings', 
      icon: 'gear',
      children: [
        { id: 'profile', content: 'Profile' },
        { id: 'security', content: 'Security' }
      ]
    }
  ];

  handleItemClick(item: MenuItem) {
    console.log('Menu item clicked:', item);
  }
}
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| mode | MenuMode | 'vertical' | Mode d'affichage |
| variant | MenuVariant | 'default' | Style du menu |
| collapsible | boolean | false | Menu pliable |
| collapsed | boolean | false | État plié |
| ariaLabels | Record<string, string> | {...} | Labels ARIA |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| items | MenuItem<T>[] | [] | Liste des éléments |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| itemClick | EventEmitter<MenuItem<T>> | Émis lors du clic |
| collapsedChange | EventEmitter<boolean> | Émis lors du pliage |

### Interface MenuItem<T>
```typescript
interface MenuItem<T = string> {
  id: string;           // Identifiant unique
  content: string;      // Contenu à afficher
  icon?: string;        // Icône Phosphor
  path?: string;        // Chemin de navigation
  disabled?: boolean;   // État désactivé
  active?: boolean;     // État actif
  children?: MenuItem<T>[]; // Sous-menu
  divider?: boolean;    // Séparateur
  badge?: string | number; // Badge
  value?: T;           // Valeur associée
}
```

## Variants Overview

### Vertical Menu
**Description**: Menu vertical avec support des sous-menus.

**Cas d'utilisation**:
- Navigation principale
- Menus latéraux
- Hiérarchie profonde

### Horizontal Menu
**Description**: Menu horizontal pour la navigation supérieure.

**Cas d'utilisation**:
- Barre de navigation
- Menu principal
- Navigation simple

### Collapsible Menu
**Description**: Menu pliable pour économiser l'espace.

**Cas d'utilisation**:
- Interfaces responsives
- Sidebars
- Navigation compacte

## États et Modificateurs

### Modes
- `vertical`: Menu vertical (défaut)
- `horizontal`: Menu horizontal

### Variantes
- `default`: Style par défaut
- `compact`: Version compacte
- `expanded`: Version étendue

### États
- `collapsed`: État plié
- `expanded`: Sous-menu déplié
- `disabled`: Élément désactivé
- `active`: Élément actif

## Accessibilité

### Attributs ARIA
- `role="navigation"`: Pour le menu
- `role="menubar"`: Pour la liste
- `role="menuitem"`: Pour les éléments
- `aria-expanded`: État d'expansion
- `aria-disabled`: État désactivé

### Bonnes Pratiques
- Navigation au clavier
- États visuels distincts
- Labels descriptifs
- Support des lecteurs d'écran

## Bonnes Pratiques

1. **Structure des Données**
   - IDs uniques pour chaque élément
   - Hiérarchie claire des éléments
   - Valeurs typées avec génériques

2. **Accessibilité**
   - Labels ARIA descriptifs
   - Support du clavier
   - États visuels clairs

3. **Performance**
   - Utilisation des signals
   - Détection de changements OnPush
   - Gestion efficace des états

4. **Responsive Design**
   - Mode pliable pour mobile
   - Adaptation horizontale/verticale
   - Gestion des longs contenus

## Exemple Complet

```typescript
import { Component } from '@angular/core';
import { PshMenuComponent } from '@ps/helix';

interface CustomValue {
  id: number;
  type: string;
}

@Component({
  selector: 'app-menu-demo',
  template: `
    <psh-menu<CustomValue>
      [items]="menuItems"
      mode="vertical"
      variant="default"
      [collapsible]="true"
      [(collapsed)]="isCollapsed"
      (itemClick)="handleItemClick($event)"
      (collapsedChange)="handleCollapsedChange($event)"
    ></psh-menu>
  `
})
export class MenuDemoComponent {
  isCollapsed = false;

  menuItems: MenuItem<CustomValue>[] = [
    {
      id: 'home',
      content: 'Home',
      icon: 'house',
      value: { id: 1, type: 'page' }
    },
    {
      id: 'settings',
      content: 'Settings',
      icon: 'gear',
      children: [
        {
          id: 'profile',
          content: 'Profile',
          value: { id: 2, type: 'settings' }
        }
      ]
    },
    {
      id: 'notifications',
      content: 'Notifications',
      icon: 'bell',
      badge: '3',
      value: { id: 3, type: 'notifications' }
    }
  ];

  handleItemClick(item: MenuItem<CustomValue>) {
    console.log('Item clicked:', item.value);
  }

  handleCollapsedChange(collapsed: boolean) {
    console.log('Menu collapsed:', collapsed);
  }
}
```