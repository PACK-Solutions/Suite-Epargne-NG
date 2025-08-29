/**
 * Modes disponibles pour la sidebar
 */
export type SidebarMode = 'fixed' | 'overlay' | 'collapsible';

/**
 * Positions possibles pour la sidebar
 */
export type SidebarPosition = 'left' | 'right';

/**
 * Configuration complète de la sidebar
 */
export interface SidebarConfig {
  /** Mode d'affichage */
  mode: SidebarMode;
  /** Position de la sidebar */
  position: SidebarPosition;
  /** Largeur de la sidebar */
  width: string;
  /** Breakpoint mobile */
  breakpoint: string;
}