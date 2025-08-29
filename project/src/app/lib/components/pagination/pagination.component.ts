import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationSize, PaginationVariant, PaginationConfig } from './pagination.types';
import { InjectionToken } from '@angular/core';

export const PAGINATION_CONFIG = new InjectionToken<Partial<PaginationConfig>>('PAGINATION_CONFIG', {
  factory: () => ({
    size: 'medium',
    variant: 'default',
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 5,
    showItemsPerPage: false,
    itemsPerPageOptions: [5, 10, 25, 50]
  })
});

export const PAGINATION_STYLES = new InjectionToken<Record<string, string>[]>('PAGINATION_STYLES', {
  factory: () => []
});

@Component({
  selector: 'psh-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshPaginationComponent {
  private config = inject(PAGINATION_CONFIG);
  private styles = inject(PAGINATION_STYLES, { optional: true }) ?? [];

  // Model inputs with defaults from config
  currentPage = model(1);
  totalPages = model(1);
  size = model<PaginationSize>(this.config.size ?? 'medium');
  variant = model<PaginationVariant>(this.config.variant ?? 'default');
  showFirstLast = model(this.config.showFirstLast ?? true);
  showPrevNext = model(this.config.showPrevNext ?? true);
  maxVisiblePages = model(this.config.maxVisiblePages ?? 5);
  showItemsPerPage = model(this.config.showItemsPerPage ?? false);

  // Regular inputs
  itemsPerPage = input(10);
  itemsPerPageOptions = input<number[]>([5, 10, 25, 50]);
  firstLabel = input('First');
  previousLabel = input('Previous');
  nextLabel = input('Next');
  lastLabel = input('Last');
  pageLabel = input('Page');
  itemsLabel = input('items');
  itemsPerPageLabel = input('Items per page');

  // Outputs
  pageChange = output<number>();
  itemsPerPageChange = output<number>();

  // Computed values
  pages = computed(() => {
    const pages: number[] = [];
    const halfVisible = Math.floor(this.maxVisiblePages() / 2);
    let start = Math.max(1, this.currentPage() - halfVisible);
    let end = Math.min(this.totalPages(), start + this.maxVisiblePages() - 1);

    if (end - start + 1 < this.maxVisiblePages()) {
      start = Math.max(1, end - this.maxVisiblePages() + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  customStyles = computed(() => Object.assign({}, ...this.styles));

  state = computed(() => this.getState());

  private getState(): string {
    if (this.currentPage() === 1) return 'first';
    if (this.currentPage() === this.totalPages()) return 'last';
    return 'default';
  }

  goToPage(page: number): void {
    if (page !== this.currentPage() && page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageChange(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value);
    this.itemsPerPageChange.emit(value);
  }
}