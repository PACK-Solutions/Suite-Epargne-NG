/**
 * Type pour l'orientation du stepper
 */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Type pour les variantes du stepper
 */
export type StepperVariant = 'default' | 'numbered' | 'progress' | 'icon-top';

/**
 * Configuration du stepper
 */
export interface StepperConfig {
  /** Orientation du stepper */
  orientation: StepperOrientation;
  /** Variante visuelle */
  variant: StepperVariant;
  /** Navigation linéaire forcée */
  linear: boolean;
  /** Index actif par défaut */
  activeIndex?: number;
  /** Labels ARIA */
  ariaLabels?: Record<string, string>;
}

/**
 * Interface pour une étape
 */
export interface StepConfig {
  /** Titre de l'étape */
  title: string;
  /** Sous-titre optionnel */
  subtitle: string | undefined;
  /** Icône optionnelle */
  icon: string | undefined;
  /** État désactivé */
  disabled: boolean;
  /** État complété */
  completed: boolean;
  /** Message d'erreur */
  error?: string;
  /** Message d'avertissement */
  warning?: string;
  /** Message de succès */
  success?: string;
}

/**
 * Configuration complète du stepper
 */
export interface StepperConfig {
  /** Orientation du stepper */
  orientation: StepperOrientation;
  /** Variante visuelle */
  variant: StepperVariant;
  /** Navigation linéaire forcée */
  linear: boolean;
  /** Index actif par défaut */
  activeIndex?: number;
  /** Labels ARIA */
  ariaLabels?: Record<string, string>;
}