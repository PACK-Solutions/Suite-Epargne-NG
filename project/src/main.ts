import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withNoXsrfProtection } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';
import { translations } from './app/i18n';
import { AppComponent } from './app/app.component';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { routes } from './app/app.routes';
import { INSURER_CONTEXT_SERVICE } from './app/lib/services/theme/theme.service';
import { InsurerContextService } from './app/core/context/insurer-context.service';

// Custom loader that only uses the French translations
class FrenchOnlyTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Always use French translations regardless of requested language
    const translation = translations['fr'];
    if (!translation) {
      throw new Error('No French translation found');
    }
    return from(Promise.resolve(translation));
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withNoXsrfProtection()),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withNavigationErrorHandler(() => null)),
    ...TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useClass: FrenchOnlyTranslateLoader
      },
      useDefaultLang: true,
    }).providers || [],
    // Fournir le service InsurerContext avec le token pour le ThemeService
    {
      provide: INSURER_CONTEXT_SERVICE,
      useExisting: InsurerContextService
    }
  ]
}).catch((err: Error) => console.error(err));