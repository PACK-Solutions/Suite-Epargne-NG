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
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItem, DropdownPlacement } from './dropdown.types';

@Component({
  selector: 'psh-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshDropdownComponent<T = string> implements OnDestroy {
  private elementRef = inject(ElementRef);
  private clickOutsideHandler: ((event: MouseEvent) => void) | null = null;

  // Model inputs
  variant = model<'primary' | 'secondary' | 'outline' | 'text'>('primary');
  placement = model<DropdownPlacement>('bottom-start');
  disabled = model(false);

  // Regular inputs
  items = input<DropdownItem<T>[]>([]);
  label = input('Dropdown Menu');
  icon = input<string>();
  ariaLabel = input<string>();

  // State
  private isOpenSignal = signal(false);
  private selectedItemSignal = signal<DropdownItem<T> | null>(null);

  // Outputs
  selected = output<DropdownItem<T>>();
  opened = output<void>();
  closed = output<void>();

  // Computed values
  isOpen = computed(() => this.isOpenSignal());
  selectedItem = computed(() => this.selectedItemSignal());

  computedAriaLabel = computed(() => 
    this.ariaLabel() || 'Toggle dropdown menu'
  );

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    if (this.isOpen()) return 'open';
    return 'closed';
  }

  constructor() {
    this.setupClickOutsideListener();
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

  toggleDropdown(): void {
    if (!this.disabled()) {
      event?.stopPropagation();
      this.isOpenSignal.update(v => !v);
      if (this.isOpen()) {
        this.opened.emit();
      } else {
        this.closed.emit();
      }
    }
  }

  selectItem(item: DropdownItem<T>): void {
    if (!item.disabled) {
      this.selectedItemSignal.set(item);
      this.selected.emit(item);
      this.close();
    }
  }

  close(): void {
    if (this.isOpen()) {
      this.isOpenSignal.set(false);
      this.closed.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
  }
}