export interface InfoCardData {
  label: string;
  value: any;
  labelWidth?: string;
  valueWidth?: string;
}

export interface InfoCardOptions {
  showEmptyState?: boolean;
  emptyStateMessage?: string;
  labelWidth?: string; 
  valueWidth?: string;
}