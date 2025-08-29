import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  /**
   * Translate a key
   * @param key Translation key
   * @param params Optional parameters
   * @returns Translated string
   */
  instant(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  /**
   * Get translation as observable
   * @param key Translation key
   * @param params Optional parameters
   * @returns Observable with translated string
   */
  get(key: string, params?: object): Observable<string> {
    return this.translate.get(key, params);
  }

  /**
   * Change the current language
   * @param lang Language code
   */
  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  /**
   * Get the current language
   * @returns Current language code
   */
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}