@@ .. @@
 import { AppComponent } from './app/app.component';
 import { provideRouter, withNavigationErrorHandler } from '@angular/router';
 import { routes } from './app/app.routes';
+import { INSURER_CONTEXT_SERVICE } from './app/lib/services/theme/theme.service';
+import { InsurerContextService } from './app/core/context/insurer-context.service';

 // Custom loader that only uses the French translations
 class FrenchOnlyTranslateLoader implements TranslateLoader {
@@ .. @@
       },
       useDefaultLang: true,
     }).providers || []
+    },
+    // Fournir le service InsurerContext avec le token pour le ThemeService
+    {
+      provide: INSURER_CONTEXT_SERVICE,
+      useExisting: InsurerContextService
+    }
   ]
 }).catch((err: Error) => console.error(err));