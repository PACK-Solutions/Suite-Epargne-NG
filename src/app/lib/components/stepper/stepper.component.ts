import { 
  ChangeDetectionStrategy, 
  Component, 
  ContentChildren, 
  ElementRef, 
  QueryList, 
  computed, 
  inject, 
  input, 
  model, 
  output,
  signal,
  ChangeDetectorRef,
  InjectionToken
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperOrientation, StepperVariant, StepConfig, StepperConfig } from './stepper.types';

/**
 * Token d'injection pour la configuration globale du stepper
 */
export const STEPPER_CONFIG = new InjectionToken<Partial<StepperConfig>>('STEPPER_CONFIG', {
  factory: () => ({
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
  })
});

/**
 * Token d'injection pour les styles personnalisés
 */
export const STEPPER_STYLES = new InjectionToken<Record<string, string>[]>('STEPPER_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshStepperComponent {
  private config = inject(STEPPER_CONFIG);
  private styles = inject(STEPPER_STYLES, { optional: true }) ?? [];
  private cdr = inject(ChangeDetectorRef);
  protected elementRef = inject(ElementRef);
  
  // État initial avec 3 étapes par défaut
  private defaultSteps: StepConfig[] = [
    { title: 'Étape 1', subtitle: undefined, icon: 'user', disabled: false, completed: false },
    { title: 'Étape 2', subtitle: undefined, icon: 'info', disabled: false, completed: false },
    { title: 'Étape 3', subtitle: undefined, icon: 'check', disabled: false, completed: false }
  ];

  // Model inputs with defaults from config
  activeStep = model(0);
  orientation = model<StepperOrientation>(this.config.orientation ?? 'horizontal');
  variant = model<StepperVariant>(this.config.variant ?? 'default');
  linear = model(this.config.linear ?? true);

  // Regular inputs
  ariaLabels = input<Record<string, string>>({
    step: 'Étape',
    completed: 'Étape complétée',
    active: 'Étape active',
    incomplete: 'Étape incomplète',
    disabled: 'Étape désactivée'
  });

  // Outputs
  stepChange = output<number>();
  completed = output<void>();

  // State
  private stepsSignal = signal<StepConfig[]>(this.defaultSteps);
  steps = computed(() => this.stepsSignal());

  // Computed values
  customStyles = computed(() => Object.assign({}, ...this.styles));

  ngAfterContentInit() {
    // Observer les changements de contenu
    const observer = new MutationObserver(() => {
      const steps = Array.from(this.elementRef.nativeElement.querySelectorAll('[stepContent]') as NodeListOf<HTMLElement>);
      
      // N'utiliser les étapes personnalisées que si elles existent
      if (steps.length > 0) {
        this.stepsSignal.set(steps.map((el, i) => ({
          title: el.getAttribute('data-title') || `Étape ${i + 1}`,
          subtitle: el.getAttribute('data-subtitle') || undefined,
          icon: el.getAttribute('data-icon') || undefined,
          disabled: el.hasAttribute('data-disabled'),
          completed: el.hasAttribute('data-completed'),
          error: el.getAttribute('data-error') || undefined,
          warning: el.getAttribute('data-warning') || undefined,
          success: el.getAttribute('data-success') || undefined
        })));
      }
      
      this.cdr.markForCheck();
    });

    observer.observe(this.elementRef.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-title', 'data-subtitle', 'data-icon', 'data-disabled', 'data-completed', 'data-error', 'data-warning', 'data-success']
    });
    
    // Initialiser les étapes
    observer.takeRecords();
  }

  // Navigation
  next(): void {
    if (this.canGoNext()) {
      this.goToStep(this.activeStep() + 1);
    }
  }

  previous(): void {
    if (this.canGoPrevious()) {
      this.goToStep(this.activeStep() - 1);
    }
  }

  goToStep(index: number): void {
    if (this.canActivateStep(index) && index !== this.activeStep()) {
      this.activeStep.set(index);
      this.stepChange.emit(index);
      this.cdr.markForCheck();
    }
  }

  // Helpers
  canGoNext(): boolean {
    const nextIndex = this.activeStep() + 1;
    return nextIndex < this.steps().length && this.canActivateStep(nextIndex);
  }

  canGoPrevious(): boolean {
    return this.activeStep() > 0;
  }

  canActivateStep(index: number): boolean {
    if (!this.linear()) return true;
    if (index === 0) return true;

    const step = this.steps()[index];
    if (step?.disabled) return false;

    return this.steps()
      .slice(0, index)
      .every(step => step.completed && !step.error);
  }

  isStepValid(index: number): boolean {
    const step = this.steps()[index];
    return step ? !!step.completed && !step.error : false;
  }

  getStepAriaLabel(step: StepConfig, index: number): string {
    const labels = this.ariaLabels();
    const status = step.completed ? labels['completed'] :
                  index === this.activeStep() ? labels['active'] :
                  step.disabled ? labels['disabled'] :
                  labels['incomplete'];
    return `${labels['step']} ${index + 1}: ${step.title} - ${status}`;
  }

  // Tracking
  trackByIndex(index: number): number {
    return index;
  }
}