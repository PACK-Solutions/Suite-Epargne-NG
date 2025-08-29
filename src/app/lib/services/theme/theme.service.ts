import { Injectable, signal, computed } from '@angular/core';
import { Theme, ThemeConfig } from './types/theme.types';
import { inject } from '@angular/core';

// Import optionnel - sera null si non fourni
interface InsurerContextService {
  primaryColor(): string;
  secondaryColor(): string;
}

// Token pour l'injection optionnelle
import { InjectionToken } from '@angular/core';
export const INSURER_CONTEXT_SERVICE = new InjectionToken<InsurerContextService>('INSURER_CONTEXT_SERVICE');

const DEFAULT_THEME_COLORS = {
  primary: '#0F02C4',
  secondary: '#7B3AEC'  
};

/**
 * Convertit une couleur hexadécimale en RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Nettoyer le hex code (enlever le # si présent)
  hex = hex.replace(/^#/, '');
  
  // S'assurer que la longueur est correcte
  if (![3, 6].includes(hex.length)) {
    console.error(`Invalid hex color: ${hex}`);
    return null;
  }
  
  // Si c'est un format court (3 chiffres), le convertir en format long (6 chiffres)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Extraire les composantes RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Convertit des valeurs RGB en couleur hexadécimale
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

/**
 * Éclaircit une couleur hexadécimale d'un certain pourcentage
 */
function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const amount = percent / 100;
  
  const newR = r + (255 - r) * amount;
  const newG = g + (255 - g) * amount;
  const newB = b + (255 - b) * amount;
  
  return rgbToHex(newR, newG, newB);
}

/**
 * Assombrit une couleur hexadécimale d'un certain pourcentage
 */
function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const amount = percent / 100;
  
  const newR = r * (1 - amount);
  const newG = g * (1 - amount);
  const newB = b * (1 - amount);
  
  return rgbToHex(newR, newG, newB);
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private insurerContext = inject(INSURER_CONTEXT_SERVICE, { optional: true });
  private isDarkThemeSignal = signal<boolean>(false);
  private themeNameSignal = signal<Theme>('light');
  private lastChangeSignal = signal<Date>(new Date());

  isDarkTheme = computed(() => this.isDarkThemeSignal());
  themeName = computed(() => this.themeNameSignal());
  
  themeInfo = computed(() => ({
    isDark: this.isDarkTheme(),
    name: this.themeName(),
    lastChange: this.lastChangeSignal()
  }));

  constructor() {
    this.setDarkTheme(false);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // this.setDarkTheme(e.matches);
    });
    
    // Attendre que l'injection soit prête avant d'appliquer le thème
    setTimeout(() => {
      this.applyInsurerTheme();
    }, 0);
  }

  setDarkTheme(isDark: boolean) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    this.isDarkThemeSignal.set(isDark);
    this.themeNameSignal.set(isDark ? 'dark' : 'light');
    this.lastChangeSignal.set(new Date());
    
    // Réappliquer les couleurs de l'assureur après le changement de thème
    this.applyInsurerTheme();
  }

  toggleTheme() {
    this.setDarkTheme(!this.isDarkThemeSignal());
  }

  updateTheme(name: Theme) {
    this.themeNameSignal.set(name);
    this.isDarkThemeSignal.set(name === 'dark');
    this.lastChangeSignal.set(new Date());
    
    // Réappliquer les couleurs de l'assureur après le changement de thème
    this.applyInsurerTheme();
  }
  
  /**
   * Applique les couleurs de l'assureur aux variables CSS
   */
  applyInsurerTheme() {
    // Debug: vérifier si le contexte assureur est disponible
    if (!this.insurerContext) {
      console.warn('InsurerContext service not available, using default theme colors');
    }
    
    // Utiliser les couleurs de l'assureur si disponibles, sinon les couleurs par défaut
    const primaryColor = this.insurerContext?.primaryColor() || DEFAULT_THEME_COLORS.primary;
    const secondaryColor = this.insurerContext?.secondaryColor() || DEFAULT_THEME_COLORS.secondary;
    
    // Debug: afficher les couleurs utilisées
    console.log('Applying theme colors:', { 
      primaryColor, 
      secondaryColor,
      hasInsurerContext: !!this.insurerContext,
      insurerPrimary: this.insurerContext?.primaryColor(),
      insurerSecondary: this.insurerContext?.secondaryColor()
    });
    
    if (primaryColor) {
      try {
        // Générer les variantes de couleurs
        const primaryColorLight = lightenColor(primaryColor, 20);
        const primaryColorLighter = lightenColor(primaryColor, 40);
        const primaryColorDark = darkenColor(primaryColor, 20);
        const primaryColorDarker = darkenColor(primaryColor, 40);
        
        // Convertir en RGB pour les besoins de transparence
        const rgb = hexToRgb(primaryColor);
        const primaryColorRgb = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : null;
        
        // Déterminer si le texte sur cette couleur doit être clair ou foncé
        // Une formule simple: luminosité = 0.299*R + 0.587*G + 0.114*B
        let primaryColorText = '#FFFFFF'; // Par défaut blanc
        if (rgb) {
          const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
          if (luminance > 0.5) {
            primaryColorText = '#000000'; // Texte noir pour les couleurs claires
          }
        }
        
        // Appliquer toutes les variantes
        document.documentElement.style.setProperty('--insurer-primary-color', primaryColor);
        document.documentElement.style.setProperty('--insurer-primary-color-light', primaryColorLight);
        document.documentElement.style.setProperty('--insurer-primary-color-lighter', primaryColorLighter);
        document.documentElement.style.setProperty('--insurer-primary-color-dark', primaryColorDark);
        document.documentElement.style.setProperty('--insurer-primary-color-darker', primaryColorDarker);
        document.documentElement.style.setProperty('--insurer-primary-color-text', primaryColorText);
        
        if (primaryColorRgb) {
          document.documentElement.style.setProperty('--insurer-primary-color-rgb', primaryColorRgb);
        }
        
        console.log(`Applied insurer theme with primary color: ${primaryColor}`);
       
       // Appliquer la couleur secondaire
       if (secondaryColor) {
         try {
           // Générer les variantes de couleurs secondaires
           const secondaryColorLight = lightenColor(secondaryColor, 20);
           const secondaryColorLighter = lightenColor(secondaryColor, 40);
           const secondaryColorDark = darkenColor(secondaryColor, 20);
           const secondaryColorDarker = darkenColor(secondaryColor, 40);
           
           // Convertir en RGB pour les besoins de transparence
           const rgb = hexToRgb(secondaryColor);
           const secondaryColorRgb = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : null;
           
           // Déterminer si le texte sur cette couleur doit être clair ou foncé
           let secondaryColorText = '#FFFFFF'; // Par défaut blanc
           if (rgb) {
             const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
             if (luminance > 0.5) {
               secondaryColorText = '#000000'; // Texte noir pour les couleurs claires
             }
           }
           
           // Appliquer toutes les variantes
           document.documentElement.style.setProperty('--insurer-secondary-color', secondaryColor);
           document.documentElement.style.setProperty('--insurer-secondary-color-light', secondaryColorLight);
           document.documentElement.style.setProperty('--insurer-secondary-color-lighter', secondaryColorLighter);
           document.documentElement.style.setProperty('--insurer-secondary-color-dark', secondaryColorDark);
           document.documentElement.style.setProperty('--insurer-secondary-color-darker', secondaryColorDarker);
           document.documentElement.style.setProperty('--insurer-secondary-color-text', secondaryColorText);
           
           if (secondaryColorRgb) {
             document.documentElement.style.setProperty('--insurer-secondary-color-rgb', secondaryColorRgb);
           }
           
           console.log(`Applied insurer theme with secondary color: ${secondaryColor}`);
         } catch (error) {
           console.error('Error applying insurer secondary color theme:', error);
         }
       }
      } catch (error) {
        console.error('Error applying insurer theme:', error);
      }
    }
  }
}