import { translations as originalTranslations } from './translations';

// Export only the French translations subset
export const translations: Record<string, any> = {
  fr: originalTranslations.fr
};

// Export the original TranslationType for typing purposes
export type { TranslationType } from './translations';