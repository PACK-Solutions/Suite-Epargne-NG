import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  ChangeDetectorRef,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType, InputVariant, InputSize, AutocompleteConfig } from './input.types';
import { HostBinding } from '@angular/core';

@Component({
  selector: 'psh-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PshInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshInputComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  
  // Generate unique ID for the input
  readonly inputId = `input-${Math.random().toString(36).substring(2, 11)}`;

  // Model inputs
  value = model('');
  disabled = model(false);
  required = model(false);
  readonly = model(false);
  loading = model(false);
  fullWidth = model(false);
  variant = model<InputVariant>('outlined');
  size = model<InputSize>('medium');
  showLabel = model(true);

  // Regular inputs
  type = input<InputType>('text');
  placeholder = input('');
  label = input('');  // Ajout d'un input label spécifique
  ariaLabel = input<string | null>(null);  // Ajout d'un input ariaLabel spécifique
  iconStart = input<string>();
  iconEnd = input<string>();
  error = input<string | null | undefined>(null);
  success = input<string | null | undefined>(null);
  hint = input<string | null | undefined>(null);
  suggestions = input<string[] | ((query: string) => Promise<string[]>)>([]);
  autocompleteConfig = input<AutocompleteConfig>({
    minLength: 1,
    debounceTime: 300
  });

  // State
  private suggestionsVisible = signal(false);
  private focusedSignal = signal(false);
  private filteredSuggestionsSignal = signal<string[]>([]);
  focusedSuggestionIndex = signal(-1);
  private passwordVisibleSignal = signal(false);

  // Outputs
  valueChange = output<string>();
  inputFocus = output<void>();
  inputBlur = output<void>();
  suggestionSelect = output<string>();

  // Computed values
  showSuggestions = computed(() => this.suggestionsVisible() && this.filteredSuggestions().length > 0);
  filteredSuggestions = computed(() => this.filteredSuggestionsSignal());
  focused = computed(() => this.focusedSignal());
  passwordVisible = computed(() => this.passwordVisibleSignal());
  effectiveType = computed(() => {
    if (this.type() === 'password') {
      return this.passwordVisible() ? 'text' : 'password';
    }
    return this.type();
  });

  // Computed aria-label pour l'accessibilité
  computedAriaLabel = computed(() => {
    return this.ariaLabel() || this.label() || this.placeholder();
  });

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    if (this.readonly()) return 'readonly';
    if (this.loading()) return 'loading';
    if (this.error()) return 'error';
    if (this.success()) return 'success';
    if (this.focused()) return 'focused';
    return 'default';
  }

  // ControlValueAccessor implementation
  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value.set(value ?? '');
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // Event handlers
  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.valueChange.emit(value);
    this.onChange(value);
    
    if (this.suggestions()) {
      this.updateSuggestions(value);
    }
  }

  handleFocus(): void {
    this.focusedSignal.set(true);
    this.inputFocus.emit();
    this.onTouched();
    
    if (this.suggestions() && this.value().length >= this.autocompleteConfig().minLength) {
      this.updateSuggestions(this.value());
    }
  }

  handleBlur(): void {
    this.focusedSignal.set(false);
    this.inputBlur.emit();
    this.onTouched();
    
    setTimeout(() => {
      this.suggestionsVisible.set(false);
      this.focusedSuggestionIndex.set(-1);
    }, 200);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (!this.showSuggestions()) return;

    const suggestions = this.filteredSuggestions();
    const currentIndex = this.focusedSuggestionIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedSuggestionIndex.update(i => 
          i < suggestions.length - 1 ? i + 1 : 0
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedSuggestionIndex.update(i => 
          i > 0 ? i - 1 : suggestions.length - 1
        );
        break;

      case 'Enter':
        event.preventDefault();
        if (currentIndex >= 0 && currentIndex < suggestions.length) {
          const selectedSuggestion = suggestions[currentIndex];
          if (selectedSuggestion) {
            this.handleSuggestionClick(selectedSuggestion);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.suggestionsVisible.set(false);
        this.focusedSuggestionIndex.set(-1);
        break;
    }
  }

  handleSuggestionClick(suggestion: string): void {
    if (suggestion) {
      this.value.set(suggestion);
      this.valueChange.emit(suggestion);
      this.onChange(suggestion);
      this.suggestionSelect.emit(suggestion);
      this.suggestionsVisible.set(false);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisibleSignal.update(v => !v);
  }

  protected hasLabelContent(): boolean {
    return !!this.elementRef.nativeElement.querySelector('[input-label]');
  }

  protected hasSlotContent(slot: string): boolean {
    return !!this.elementRef.nativeElement.querySelector(`[${slot}]`);
  }

  focusSelect(): void {
    const input = this.elementRef.nativeElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  private async updateSuggestions(value: string) {
    const suggestionsValue = this.suggestions();
    
    if (typeof suggestionsValue === 'function') {
      try {
        const results = await suggestionsValue(value);
        if (Array.isArray(results)) {
          this.filteredSuggestionsSignal.set(results);
          this.suggestionsVisible.set(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        this.filteredSuggestionsSignal.set([]);
      }
    } else if (Array.isArray(suggestionsValue)) {
      const filtered = suggestionsValue.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      this.filteredSuggestionsSignal.set(filtered);
      this.suggestionsVisible.set(true);
    }
  }
}