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
  OnDestroy,
  ChangeDetectorRef,
  AfterContentInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption, SelectOptionGroup, SelectSize, SearchConfig, VirtualScrollConfig } from './select.types';

@Component({
  selector: 'psh-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PshSelectComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshSelectComponent<T = any> implements ControlValueAccessor, OnDestroy, AfterContentInit {
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private clickOutsideHandler: ((event: MouseEvent) => void) | null = null;

  // Unique ID for the select
  readonly selectId = `select-${Math.random().toString(36).substring(2, 11)}`;

  // Model inputs
  value = model<T | T[] | null>(null);
  disabled = model(false);
  required = model<boolean | ''>('');
  size = model<SelectSize>('medium');
  searchable = model(false);
  multiple = model(false);
  clearable = model(false);
  loading = model(false);
  fullWidth = model(false);
  virtualScroll = model(false);
  showLabel = model(true); // Moved from regular input to model input

  // Regular inputs
  options = input<(SelectOption<T> | SelectOptionGroup<T>)[]>([]);
  label = input(''); // Added dedicated label property
  ariaLabel = input<string | null>(null); // Added dedicated ariaLabel property
  placeholder = input<string>('Sélectionner une option');
  multiplePlaceholder = input<string>('Sélectionner des options');
  error = input('');
  success = input('');
  hint = input('');
  maxSelections = input<number | undefined>(undefined);
  minSelections = input<number | undefined>(undefined);
  compareWith = input<(a: T, b: T) => boolean>((a, b) => a === b);
  searchConfig = input<SearchConfig>({
    debounceTime: 300,
    placeholder: 'Rechercher...',
    minLength: 1
  });
  virtualScrollConfig = input<VirtualScrollConfig>({
    itemSize: 40,
    buffer: 4
  });

  // State
  private isOpenSignal = signal(false);
  private searchTermSignal = signal('');
  private selectedLabelSignal = signal('');
  private focusedOptionIndex = signal(-1);
  private hasLabelContentSignal = signal(false);
  private initializedSignal = signal(false);

  // Outputs
  valueChange = output<T | T[] | null>();
  opened = output<void>();
  closed = output<void>();
  scrollEnd = output<void>();
  loadOptions = output<string>();
  searched = output<string>();

  // Computed values
  isOpen = computed(() => this.isOpenSignal());
  searchTerm = computed(() => this.searchTermSignal());
  hasLabelContent = computed(() => this.hasLabelContentSignal());

  // Computed aria-label pour l'accessibilité
  computedAriaLabel = computed(() => {
    return this.ariaLabel() || this.label() || this.placeholder();
  });

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    if (this.loading()) return 'loading';
    if (this.error()) return 'error';
    if (this.success()) return 'success';
    if (this.isOpen()) return 'open';
    return 'closed';
  }

  selectedLabel = computed(() => {
    if (!this.initializedSignal() || !this.hasValue()) {
      return this.multiple() ? this.multiplePlaceholder() : this.placeholder();
    }
    return this.selectedLabelSignal() || (this.multiple() ? this.multiplePlaceholder() : this.placeholder());
  });

  filteredOptions = computed(() => {
    const term = this.searchTermSignal().toLowerCase();
    const opts = this.options();
    
    if (!term) return opts;

    return opts.map(opt => {
      if (this.isOptionGroup(opt)) {
        const filteredOptions = opt.options.filter(o => 
          o.label.toLowerCase().includes(term) ||
          o.description?.toLowerCase().includes(term)
        );
        return filteredOptions.length > 0 ? { ...opt, options: filteredOptions } : null;
      }
      return opt.label.toLowerCase().includes(term) ||
             opt.description?.toLowerCase().includes(term)
        ? opt
        : null;
    }).filter((opt): opt is (SelectOption<T> | SelectOptionGroup<T>) => opt !== null);
  });

  constructor() {
    this.setupClickOutsideListener();
  }

  ngAfterContentInit() {
    Promise.resolve().then(() => {
      const hasLabel = !!this.elementRef.nativeElement.querySelector('[select-label]');
      this.hasLabelContentSignal.set(hasLabel);
      this.initializedSignal.set(true);
      this.cdr.markForCheck();
    });
  }

  private setupClickOutsideListener(): void {
    this.clickOutsideHandler = (event: MouseEvent) => {
      if (this.isOpen()) {
        const target = event.target as HTMLElement;
        if (!this.elementRef.nativeElement.contains(target)) {
          this.close();
        }
      }
    };
    document.addEventListener('click', this.clickOutsideHandler);
  }

  // Keyboard navigation
  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggle();
        } else if (this.focusedOptionIndex() >= 0) {
          const options = this.flattenOptions(this.filteredOptions());
          const option = options[this.focusedOptionIndex()];
          if (option) this.select(option);
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggle();
        } else {
          this.focusNextOption();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.focusPreviousOption();
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;

      case 'Tab':
        if (this.isOpen()) {
          this.close();
        }
        break;
    }
  }

  handleOptionKeyDown(event: KeyboardEvent, option: SelectOption<T>): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(option);
        break;
      
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  private focusNextOption(): void {
    const options = this.flattenOptions(this.filteredOptions());
    if (options.length === 0) return;

    const currentIndex = this.focusedOptionIndex();
    const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    this.focusedOptionIndex.set(nextIndex);
    this.scrollOptionIntoView(nextIndex);
  }

  private focusPreviousOption(): void {
    const options = this.flattenOptions(this.filteredOptions());
    if (options.length === 0) return;

    const currentIndex = this.focusedOptionIndex();
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    this.focusedOptionIndex.set(previousIndex);
    this.scrollOptionIntoView(previousIndex);
  }

  private scrollOptionIntoView(index: number): void {
    requestAnimationFrame(() => {
      const option = this.elementRef.nativeElement.querySelector(
        `.select-option:nth-child(${index + 1})`
      );
      if (option) {
        option.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  // ControlValueAccessor implementation
  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.initializedSignal.set(true);
    this.value.set(value);
    this.updateSelectedLabel();
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

  // Helper method to check if an option is a group
  isOptionGroup(option: SelectOption<T> | SelectOptionGroup<T>): option is SelectOptionGroup<T> {
    return 'options' in option;
  }

  // Get unique key for tracking
  getOptionKey(option: SelectOption<T> | SelectOptionGroup<T>): string {
    return this.isOptionGroup(option) ? `group-${option.label}` : `option-${String(option.value)}`;
  }

  // Check if there is a selected value
  hasValue(): boolean {
    const currentValue = this.value();
    if (this.multiple()) {
      return Array.isArray(currentValue) && currentValue.length > 0;
    }
    return currentValue !== null && currentValue !== undefined;
  }

  // Focus methods
  focusSelect(): void {
    const trigger = this.elementRef.nativeElement.querySelector('.select-trigger');
    if (trigger) {
      trigger.focus();
    }
  }

  // Selection methods
  select(option: SelectOption<T>): void {
    if (!this.disabled() && !option.disabled) {
      if (this.multiple()) {
        const currentValue = this.value();
        const values = Array.isArray(currentValue) ? [...currentValue] : [];
        const index = values.findIndex(v => this.compareWith()(v, option.value));
        
        if (index === -1) {
          const maxSelections = this.maxSelections();
          if (!maxSelections || values.length < maxSelections) {
            values.push(option.value);
          }
        } else {
          const minSelections = this.minSelections();
          if (!minSelections || values.length > minSelections) {
            values.splice(index, 1);
          }
        }
        
        this.value.set(values);
        this.onChange(values);
      } else {
        this.value.set(option.value);
        this.onChange(option.value);
        this.close();
      }
      
      this.valueChange.emit(this.value());
      this.updateSelectedLabel();
      this.onTouched();
    }
  }

  isSelected(option: SelectOption<T>): boolean {
    const currentValue = this.value();
    if (this.multiple() && Array.isArray(currentValue)) {
      return currentValue.some(v => this.compareWith()(v, option.value));
    }
    return currentValue !== null && this.compareWith()(currentValue as T, option.value);
  }

  // UI methods
  toggle(): void {
    if (!this.disabled()) {
      event?.stopPropagation();
      this.isOpenSignal.update(v => !v);
      if (this.isOpenSignal()) {
        this.opened.emit();
      } else {
        this.closed.emit();
      }
    }
  }

  close(): void {
    if (this.isOpenSignal()) {
      this.isOpenSignal.set(false);
      this.focusedOptionIndex.set(-1);
      this.searchTermSignal.set('');
      this.closed.emit();
    }
  }

  clear(event: Event): void {
    event.stopPropagation();
    if (!this.disabled()) {
      const newValue = this.multiple() ? [] : null;
      this.value.set(newValue);
      this.onChange(newValue);
      this.valueChange.emit(newValue);
      this.updateSelectedLabel();
      this.onTouched();
    }
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTermSignal.set(term);
    if (term.length >= (this.searchConfig().minLength ?? 1)) {
      this.searched.emit(term);
    }
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight
    ) {
      this.scrollEnd.emit();
    }
  }

  private updateSelectedLabel(): void {
    const currentValue = this.value();
    const currentOptions = this.flattenOptions(this.options());

    if (this.multiple() && Array.isArray(currentValue)) {
      const selected = currentOptions.filter(opt => 
        currentValue.some(v => this.compareWith()(v, opt.value))
      );
      if (selected.length > 0) {
        const labels = selected.map(opt => opt.label);
        this.selectedLabelSignal.set(labels.join(', '));
      } else {
        this.selectedLabelSignal.set('');
      }
    } else {
      const selected = currentOptions.find(opt => 
        currentValue !== null && this.compareWith()(opt.value, currentValue as T)
      );
      if (selected) {
        this.selectedLabelSignal.set(selected.label);
      } else {
        this.selectedLabelSignal.set('');
      }
    }
    this.cdr.markForCheck();
  }

  private flattenOptions(options: (SelectOption<T> | SelectOptionGroup<T>)[]): SelectOption<T>[] {
    return options.reduce((acc, opt) => {
      if (this.isOptionGroup(opt)) {
        return [...acc, ...opt.options];
      }
      return [...acc, opt];
    }, [] as SelectOption<T>[]);
  }

  ngOnDestroy(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
  }
}