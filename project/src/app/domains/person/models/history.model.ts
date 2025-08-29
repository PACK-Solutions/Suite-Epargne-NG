export interface HistoryEntry {
  date: string;
  event: string;
  description: string;
  user: string;
  changes?: Record<string, { old: any; new: any }>;
}