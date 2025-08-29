# Stepper Component Documentation

## Installation et Utilisation

### Installation

```typescript
import { PshStepperComponent } from '@ps/helix';

@Component({
  // ...
  imports: [PshStepperComponent]
})
```

### Utilisation de Base

```html
<!-- Stepper basique avec contenu par défaut -->
<psh-stepper></psh-stepper>

<!-- Stepper avec contenu personnalisé -->
<psh-stepper
  [(activeStep)]="activeStep"
  (stepChange)="handleStepChange($event)"
  (completed)="handleComplete()"
>
  <div stepContent data-title="Compte" data-icon="user">
    Contenu de l'étape 1
  </div>
  <div stepContent data-title="Détails" data-icon="info">
    Contenu de l'étape 2
  </div>
  <div stepContent data-title="Confirmation" data-icon="check">
    Contenu de l'étape 3
  </div>
</psh-stepper>
```

### Avec Validation de Formulaires

```html
<psh-stepper [linear]="true">
  <div 
    stepContent 
    data-title="Informations"
    data-icon="user"
    [attr.data-completed]="isStep1Valid()"
    [attr.data-error]="step1Error"
  >
    <form [formGroup]="step1Form">
      <!-- Contenu du formulaire -->
    </form>
  </div>
  
  <div 
    stepContent 
    data-title="Validation"
    data-icon="check"
    [attr.data-disabled]="!isStep1Valid()"
  >
    <!-- Contenu de validation -->
  </div>
</psh-stepper>
```

## API

### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| activeStep | number | 0 | Index de l'étape active |
| orientation | StepperOrientation | 'horizontal' | Orientation du stepper |
| variant | StepperVariant | 'default' | Style visuel |
| linear | boolean | true | Force la progression linéaire |

### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| ariaLabels | Record<string, string> | {...} | Labels ARIA |

### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| stepChange | EventEmitter<number> | Émis lors du changement d'étape |
| completed | EventEmitter<void> | Émis à la fin du processus |

### Attributs des Étapes
| Attribut | Type | Description |
|----------|------|-------------|
| data-title | string | Titre de l'étape |
| data-subtitle | string | Sous-titre optionnel |
| data-icon | string | Icône Phosphor |
| data-disabled | boolean | État désactivé |
| data-completed | boolean | État complété |
| data-error | string | Message d'erreur |
| data-warning | string | Message d'avertissement |
| data-success | string | Message de succès |

## Documentation Technique

### Configuration Globale

```typescript
@Component({
  providers: [
    {
      provide: STEPPER_CONFIG,
      useValue: {
        orientation: 'horizontal',
        variant: 'default',
        linear: true,
        ariaLabels: {
          step: 'Étape',
          completed: 'Étape complétée',
          active: 'Étape active',
          incomplete: 'Étape incomplète',
          disabled: 'Étape désactivée'
        }
      }
    }
  ]
})
```

### Types et Interfaces

```typescript
// Types disponibles
type StepperOrientation = 'horizontal' | 'vertical';
type StepperVariant = 'default' | 'numbered' | 'progress' | 'icon-top';

// Configuration d'une étape
interface StepConfig {
  title: string;
  subtitle?: string;
  icon?: string;
  disabled: boolean;
  completed: boolean;
  error?: string;
  warning?: string;
  success?: string;
}

// Configuration globale
interface StepperConfig {
  orientation: StepperOrientation;
  variant: StepperVariant;
  linear: boolean;
  ariaLabels?: Record<string, string>;
}
```

### Méthodes Publiques

```typescript
// Navigation
next(): void;
previous(): void;
goToStep(index: number): void;

// Validation
canGoNext(): boolean;
canGoPrevious(): boolean;
canActivateStep(index: number): boolean;
isStepValid(index: number): boolean;
```

### Exemple d'Implémentation

```typescript
@Component({
  template: `
    <psh-stepper
      [(activeStep)]="currentStep"
      [linear]="true"
      (stepChange)="handleStepChange($event)"
      (completed)="handleComplete()"
    >
      <div 
        stepContent 
        data-title="Étape 1"
        [attr.data-completed]="isStep1Valid()"
      >
        <form [formGroup]="step1Form">
          <!-- Contenu du formulaire -->
        </form>
        <div class="actions">
          <button (click)="nextStep()">Suivant</button>
        </div>
      </div>
      
      <div 
        stepContent 
        data-title="Étape 2"
        [attr.data-disabled]="!isStep1Valid()"
      >
        <!-- Contenu étape 2 -->
      </div>
    </psh-stepper>
  `
})
export class StepperExampleComponent {
  currentStep = 0;
  step1Form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      // Configuration du formulaire
    });
  }

  handleStepChange(step: number) {
    console.log('Active step:', step);
  }

  handleComplete() {
    if (this.step1Form.valid) {
      console.log('Process completed!');
    }
  }

  isStep1Valid(): boolean {
    return this.step1Form.valid;
  }
}
```

## Bonnes Pratiques

1. **Structure du Contenu**
   - Utiliser les attributs data-* pour configurer les étapes
   - Maintenir une hiérarchie claire
   - Fournir des titres descriptifs
   - Gérer les états de validation

2. **Accessibilité**
   - Labels descriptifs
   - Support du clavier
   - États ARIA appropriés
   - Messages d'erreur vocaux

3. **Performance**
   - Utilisation des signals
   - Détection de changements OnPush
   - Tracking optimisé
   - Nettoyage des ressources

4. **Internationalisation**
   - Support des attributs traduits
   - Messages d'état localisés
   - Support RTL/LTR
   - Textes adaptables

5. **Validation**
   - Validation par étape
   - Progression conditionnelle
   - États d'erreur clairs
   - Feedback immédiat

6. **Responsive Design**
   - Adaptation orientation/mobile
   - Gestion des longs contenus
   - Transitions fluides
   - États visuels clairs