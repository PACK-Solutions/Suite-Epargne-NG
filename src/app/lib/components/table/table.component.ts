import { ChangeDetectionStrategy, Component, computed, inject, input, model, output, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, TableRow, TableSort, TableConfig, TableRowClickEvent } from './table.types';
import { InjectionToken } from '@angular/core';

export const TABLE_CONFIG = new InjectionToken<Partial<TableConfig>>('TABLE_CONFIG', {
  factory: () => ({
    variant: 'default',
    size: 'medium',
    striped: false,
    hoverable: false,
    bordered: false,
    loading: false,
    emptyMessage: 'No data available',
    noResultsMessage: 'No results found',
    globalSearch: false,
    globalSearchPlaceholder: 'Search in all columns...'
  })
});

export const TABLE_STYLES = new InjectionToken<Record<string, string>[]>('TABLE_STYLES', {
  factory: () => [{}]
});

@Component({
  selector: 'psh-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshTableComponent {
  private config = inject(TABLE_CONFIG);
  private cdr = inject(ChangeDetectorRef);
  private styles = inject(TABLE_STYLES, { optional: true }) ?? [{}];

  // Default data
  private defaultColumns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '80px', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ];

  private defaultData: TableRow[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  // Model inputs with defaults from config
  variant = model<'default' | 'outline'>(this.config.variant ?? 'default');
  size = model<'small' | 'medium' | 'large'>(this.config.size ?? 'medium');
  striped = model(this.config.striped ?? false);
  hoverable = model(this.config.hoverable ?? false);
  bordered = model(this.config.bordered ?? false);
  loading = model(this.config.loading ?? false);
  globalSearch = model(this.config.globalSearch ?? false); // Changed from input to model to support applyDefaults

  // Regular inputs
  columns = input<TableColumn[]>([]);
  data = input<TableRow[]>([]);
  emptyMessage = input<string>('No data available');
  noResultsMessage = input<string>('No results found');
  globalSearchPlaceholder = input(this.config.globalSearchPlaceholder ?? 'Search in all columns...');

  // Outputs
  sortChange = output<TableSort>();
  globalSearchChange = output<string>();
  rowClick = output<TableRowClickEvent>();

  // State
  currentSortSignal = model<TableSort | undefined>();
  searchTermSignal = model('');

  // Computed values
  computedEmptyMessage = computed(() => {
    return this.searchTerm() 
      ? `${this.noResultsMessage()} "${this.searchTerm()}"` 
      : this.emptyMessage();
  });

  currentSort = computed(() => this.currentSortSignal());
  searchTerm = computed(() => this.searchTermSignal());

  state = computed(() => {
    if (this.loading()) return 'loading';
    if (this.filteredData().length === 0) return 'empty';
    return 'default';
  });

  filteredData = computed(() => {
    let result = [...this.data()];
    
    // Apply global search
    if (this.searchTerm()) {
      result = this.filterData(result, this.searchTerm());
    }

    // Apply sorting
    const sort = this.currentSort();
    if (sort) {
      result = this.sortData(result, sort);
    }

    return result;
  });

  customStyles = computed(() => {
    return Object.assign({}, ...this.styles);
  });

  /**
   * Trie les données
   */
  private sortData(data: TableRow[], sort: TableSort): TableRow[] {
    return [...data].sort((a, b) => {
      const column = this.columns().find(col => col.key === sort.key);
      
      // Utiliser la fonction de tri personnalisée si elle existe
      if (column?.sortFn) {
        return sort.direction === 'asc' 
          ? column.sortFn(a, b)
          : column.sortFn(b, a);
      }
      
      // Sinon, utiliser le tri par défaut avec le chemin
      const aValue = this.getNestedValue(a, column?.path || sort.key);
      const bValue = this.getNestedValue(b, column?.path || sort.key);
      
      if (sort.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  /**
   * Filtre les données
   */
  private filterData(data: TableRow[], searchTerm: string): TableRow[] {
    if (!searchTerm) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter(row => {
      return this.columns().some(column => {
        const value = this.getNestedValue(row, column.path || column.key);
        return value?.toString().toLowerCase().includes(term);
      });
    });
  }

  /**
   * Récupère la valeur d'un objet imbriqué en utilisant un chemin
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  handleSort(column: TableColumn): void {
    if (!column.sortable) return;

    const direction = !this.currentSort() || this.currentSort()?.key !== column.key
      ? 'asc'
      : this.currentSort()?.direction === 'asc'
        ? 'desc'
        : 'asc';

    const sort: TableSort = { key: column.key, direction };
    this.currentSortSignal.set(sort);
    this.sortChange.emit(sort);
    this.cdr.markForCheck();
  }

  handleGlobalSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermSignal.set(value);
    this.globalSearchChange.emit(value);
    this.cdr.markForCheck();
  }

  handleRowClick(row: TableRow): void {
    this.rowClick.emit({ id: row.id, row });
  }

  /**
   * Applique la configuration par défaut
   */
  static applyDefaults(component: PshTableComponent): void {
    const config = inject(TABLE_CONFIG);
    if (config.variant) component.variant.set(config.variant);
    if (config.size) component.size.set(config.size);
    if (config.striped !== undefined) component.striped.set(config.striped);
    if (config.hoverable !== undefined) component.hoverable.set(config.hoverable);
    if (config.bordered !== undefined) component.bordered.set(config.bordered);
    if (config.loading !== undefined) component.loading.set(config.loading);
    if (config.globalSearch !== undefined) component.globalSearch.set(config.globalSearch);
  }
}