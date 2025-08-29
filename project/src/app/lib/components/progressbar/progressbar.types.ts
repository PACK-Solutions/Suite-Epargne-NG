/**
 * Variantes disponibles pour la barre de progression
 */
export type ProgressbarVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/**
 * Tailles disponibles pour la barre de progression
 */
export type ProgressbarSize = 'small' | 'medium' | 'large';

/**
 * Configuration complète d'une barre de progression
 */
export interface ProgressbarConfig {
  /** Valeur actuelle */
  value: number;
  /** Valeur maximale */
  max: number;
  /** Variante visuelle */
  variant: ProgressbarVariant;
  /** Taille de la barre */
  size: ProgressbarSize;
  /** Afficher le label */
  showLabel: boolean;
  /** État indéterminé */
  indeterminate: boolean;
  /** Effet strié */
  striped: boolean;
  /** Animation des stries */
  animated: boolean;
}