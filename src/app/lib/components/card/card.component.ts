import {
  ChangeDetectionStrategy, 
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ElementRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

type CardVariant = 'default' | 'elevated' | 'outlined';
type CardAlignment = 'start' | 'center' | 'end' | 'stretch';

@Component({
  selector: 'psh-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshCardComponent {
  private elementRef = inject(ElementRef);

  // Layout et structure
  variant = model<CardVariant>('default');
  orientation = model<'vertical' | 'horizontal'>('vertical');
  columnGap = input('var(--spacing-md)');
  padding = input<string | Record<string, string>>('var(--spacing-md)');
  
  // Dimensions et ratios
  minWidth = input<string>();
  maxWidth = input<string>();
  
  // Alignements
  contentAlignment = model<CardAlignment>('start');
  headerAlignment = input<CardAlignment>('start');
  footerAlignment = input<CardAlignment>('start');
  
  // Styles par zone
  headerStyle = input<Record<string, string>>({});
  contentStyle = input<Record<string, string>>({});
  footerStyle = input<Record<string, string>>({});
  sideStyle = input<Record<string, string>>({});
  
  // Comportement
  collapsible = model(false);
  expanded = model(true);
  hoverable = model(false);
  interactive = model(false);
  loading = model(false);
  disabled = model(false);

  // Slots visibility
  showHeader = input(true);
  showFooter = input(true);
  showDivider = input(true);

  // Events
  clicked = output<MouseEvent>();
  expandedChange = output<boolean>();

  // Internal state
  protected hasHeaderContentSignal = signal(false);
  protected hasFooterContentSignal = signal(false);

  // Computed values for template
  protected hasHeaderContent = computed(() => this.hasHeaderContentSignal());
  protected hasFooterContent = computed(() => this.hasFooterContentSignal());

  state = computed(() => this.getState());

  private getState(): string {
    if (this.disabled()) return 'disabled';
    if (this.loading()) return 'loading';
    if (this.expanded()) return 'expanded';
    return 'default';
  }

  // Computed styles
  computedStyles = computed(() => {
    const styles: Record<string, string> = {};
    
    if (this.minWidth()) {
      styles['min-width'] = this.minWidth() as string;
    }
    if (this.maxWidth()) {
      styles['max-width'] = this.maxWidth() as string;
    }
    if (typeof this.padding() === 'string') {
      styles['padding'] = this.padding() as string;
    }
    
    return styles;
  });

  ngAfterContentInit() {
    // Detect custom content
    this.hasHeaderContentSignal.set(!!this.elementRef.nativeElement.querySelector('[card-header]'));
    this.hasFooterContentSignal.set(!!this.elementRef.nativeElement.querySelector('[card-footer]'));
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && this.interactive()) {
      this.clicked.emit(event);
    }
  }

  toggleExpand(): void {
    if (this.collapsible()) {
      this.expanded.update(v => !v);
      this.expandedChange.emit(this.expanded());
    }
  }
}