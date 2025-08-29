# PieChart Component Documentation

## Installation et Utilisation

### Installation

```bash
npm install @ps/helix
```

### Import du Composant

```typescript
import { PshPieChartComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshPieChartComponent],
  // ...
})
```

### Utilisation de Base

```typescript
// Graphique basique avec données par défaut
<psh-pie-chart></psh-pie-chart>

// Graphique avec données et configuration personnalisées
<psh-pie-chart
  [data]="[
    { label: 'Segment 1', value: 30, index: 0, color: 'var(--primary-color)' },
    { label: 'Segment 2', value: 25, index: 1, color: 'var(--secondary-color)' }
  ]"
  [config]="{
    width: 400,
    height: 400,
    showLegend: true,
    legendPosition: 'right'
  }"
></psh-pie-chart>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| config | PieChartConfig | DEFAULT_CONFIG | Configuration du graphique |
| data | PieChartData[] | DEFAULT_DATA | Données du graphique |
| hoveredIndex | number \| null | null | Index du segment survolé |
| hiddenSegments | Set<number> | new Set() | Segments masqués |

### Types

```typescript
interface PieChartData {
  label: string;     // Label du segment
  value: number;     // Valeur numérique
  color?: string;    // Couleur CSS (optionnel)
  index: number;     // Index unique
}

interface PieChartConfig {
  width: number;              // Largeur en pixels
  height: number;            // Hauteur en pixels
  margin: number;            // Marge en pixels
  tooltipFormat: 'value' | 'percentage' | 'both'; // Format des infobulles
  showLegend: boolean;       // Afficher la légende
  legendPosition: 'right' | 'bottom' | 'top' | 'left'; // Position de la légende
  interactive: boolean;      // Activer les interactions
}
```

## Configuration par Défaut

Le composant PieChart inclut une configuration par défaut intégrée :

```typescript
const DEFAULT_CONFIG = {
  width: 400,
  height: 400,
  margin: 40,
  tooltipFormat: 'percentage',
  showLegend: true,
  legendPosition: 'right',
  interactive: true
};

const DEFAULT_DATA = [
  { label: 'Segment 1', value: 30, index: 0, color: 'var(--primary-color)' },
  { label: 'Segment 2', value: 25, index: 1, color: 'var(--secondary-color)' },
  { label: 'Segment 3', value: 20, index: 2, color: 'var(--success-color)' },
  { label: 'Segment 4', value: 15, index: 3, color: 'var(--warning-color)' }
];
```

## Fonctionnalités

### Interactivité
- Survol des segments avec infobulles
- Légende interactive pour masquer/afficher des segments
- Animations fluides
- Support du thème clair/sombre

### Accessibilité
- Labels ARIA appropriés
- Support des lecteurs d'écran
- Navigation au clavier
- Contrastes optimisés

### Responsive Design
- S'adapte à la taille du conteneur
- Légende repositionnable
- Gestion des petits écrans

## Bonnes Pratiques

1. **Données**
   - Fournir des labels descriptifs
   - Assurer des valeurs positives
   - Maintenir des index uniques
   - Utiliser des couleurs CSS variables

2. **Configuration**
   - Adapter les dimensions au conteneur
   - Choisir le format d'infobulle approprié
   - Positionner la légende selon l'espace disponible

3. **Accessibilité**
   - Fournir des labels descriptifs
   - Assurer un contraste suffisant
   - Tester avec les lecteurs d'écran

4. **Performance**
   - Limiter le nombre de segments
   - Optimiser les animations
   - Gérer efficacement les mises à jour

## Exemple Complet

```typescript
import { Component } from '@angular/core';
import { PshPieChartComponent } from '@ps/helix';

@Component({
  selector: 'app-pie-chart-demo',
  standalone: true,
  imports: [PshPieChartComponent],
  template: `
    <psh-pie-chart
      [data]="chartData"
      [config]="chartConfig"
    ></psh-pie-chart>
  `
})
export class PieChartDemoComponent {
  chartData = [
    { label: 'Ventes', value: 350, index: 0, color: 'var(--primary-color)' },
    { label: 'Marketing', value: 250, index: 1, color: 'var(--secondary-color)' },
    { label: 'R&D', value: 200, index: 2, color: 'var(--success-color)' }
  ];

  chartConfig = {
    width: 400,
    height: 400,
    margin: 40,
    tooltipFormat: 'both',
    showLegend: true,
    legendPosition: 'right',
    interactive: true
  };
}
```