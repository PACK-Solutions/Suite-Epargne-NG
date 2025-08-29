export interface TaxInfo {
  taxNumber: string;
  householdReference: string;
  taxSituation: string;
  taxResidence: string;
  fatcaStatus: boolean;
  countryOfResidence: string;
  regime?: string;
  regimeLocal?: string;
  tauxPasrau?: number;
}