/**
 * Variantes disponibles pour le tag
 */
export type TagVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/**
 * Tailles disponibles pour le tag
 */
export type TagSize = 'small' | 'medium' | 'large';

/**
 * Configuration complète d'un tag
 */
export interface TagConfig {
  /** Variante visuelle */
  variant: TagVariant;
  /** Taille du tag */
  size: TagSize;
  /** Icône Phosphor */
  icon?: string;
  /** Tag fermable */
  closable: boolean;
  /** État désactivé */
  disabled: boolean;
  /** Label du bouton de fermeture */
  closeLabel?: string;
}