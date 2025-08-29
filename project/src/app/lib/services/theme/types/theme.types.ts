export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  isDark: boolean;
  name: Theme;
  insurerTheme?: {
    primaryColor: string;
    secondaryColor?: string;
  };
}