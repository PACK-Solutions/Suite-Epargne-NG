export interface Contract {
  id: number;
  contractNumber: string;
  personId: number;
  product: string;
  acquiredSavings: number;
  status: 'active' | 'pending' | 'closed';
  startDate: Date;
  endDate?: Date;
}