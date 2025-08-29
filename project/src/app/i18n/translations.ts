// Export a simplified version of translations with just French support
export const translations = {
  fr: {
    NAVIGATION: {
      INTRODUCTION: 'Introduction',
      DESIGN_PRINCIPLES: 'Principes de Design',
      TONE_AND_VOICE: 'Ton et Voix',
      I18N: 'Internationalisation',
      TERMINOLOGY: 'Terminologie',
      TYPOGRAPHY: 'Typographie',
      COLORS: 'Couleurs',
      GRID_SYSTEM: 'Système de Grille',
      ICONS: 'Icônes',
      ALERTS: 'Alertes',
      AVATAR: 'Avatar',
      BADGES: 'Badges',
      BUTTONS: 'Boutons',
      CARDS: 'Cartes',
      CHARTS: 'Graphiques',
      CHECKBOXES: 'Cases à cocher',
      COLLAPSE: 'Sections pliables',
      DROPDOWNS: 'Menus déroulants',
      INPUTS: 'Champs de saisie',
      MENU: 'Menu',
      MODALS: 'Fenêtres modales',
      PAGINATION: 'Pagination',
      PROGRESSBAR: 'Barre de progression',
      SELECT: 'Sélection',
      SIDEBAR: 'Menu latéral',
      SPINLOADER: 'Indicateur de chargement',
      STEPPER: 'Assistant par étapes',
      SWITCHES: 'Interrupteurs',
      TAB_BAR: 'Barre d\'onglets',
      TABS: 'Onglets',
      TABLES: 'Tableaux',
      TAGS: 'Étiquettes',
      TOASTS: 'Notifications',
      TOOLTIPS: 'Infobulles'
    },
    DESIGN_SYSTEM: {
      TITLE: 'Démo du Design System',
      TOGGLE_THEME: 'Changer le thème',
      CURRENT_THEME: 'Thème actuel : {{theme}}'
    },
    THEME: {
      DARK: 'Sombre',
      LIGHT: 'Clair'
    },
    BUTTON: {
      LOADING: 'Chargement...',
      DISABLED: 'Bouton désactivé',
      ARIA: {
        LOADING: 'Chargement en cours, veuillez patienter',
        DISABLED: 'Cette action est actuellement indisponible'
      }
    },
    TOAST: {
      DISMISS: 'Fermer la notification',
      SUCCESS: 'Opération effectuée avec succès',
      ERROR: 'Une erreur est survenue',
      INFO: 'Information importante',
      WARNING: 'Attention requise'
    },
    ALERT: {
      DISMISS: 'Fermer l\'alerte'
    },
    DROPDOWN: {
      TITLE: 'Menu',
      TOGGLE: 'Ouvrir/fermer le menu'
    }
  }
};

export type TranslationType = typeof translations.fr;