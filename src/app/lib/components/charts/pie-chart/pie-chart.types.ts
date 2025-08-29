/**
 * Interface pour les données du graphique
 */
export interface PieChartData {
  /** Label du segment */
  label: string;
  /** Valeur numérique */
  value: number;
  /** Couleur CSS (optionnel) */
  color?: string;
  /** Index unique */
  index: number;
}

/**
 * Configuration du graphique
 */
export interface PieChartConfig {
  /** Largeur en pixels */
  width: number;
  /** Hauteur en pixels */
  height: number;
  /** Marge en pixels */
  margin: number;
  /** Format des infobulles */
  tooltipFormat: 'value' | 'percentage' | 'both';
  /** Afficher la légende */
  showLegend: boolean;
  /** Position de la légende */
  legendPosition: 'right' | 'bottom' | 'top' | 'left';
  /** Activer les interactions */
  interactive: boolean;
}

/**
 * Segment calculé du graphique
 */
export interface PieChartSegment extends PieChartData {
  /** Angle de début */
  startAngle: number;
  /** Angle de fin */
  endAngle: number;
  /** Pourcentage */
  percentage: number;
  /** Chemin SVG */
  path: string;
}