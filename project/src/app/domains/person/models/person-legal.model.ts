export interface PersonLegal {
  id: number;
  raisonSociale: string;
  formeJuridique: FormeJuridique;
  secteurActivite: SecteurActivite;
  siret: string;
  siren: string;
  representantLegal?: RepresentantLegal;
  address?: AddressAndCommunication;
  communication?: CommunicationInfo;
  contracts?: Contract[];
  bankingInfo?: BankingInfo;
  taxInfo?: TaxInfo;
  history?: HistoryEntry[];
}

export interface PersonLegalDetails extends PersonLegal {
  documents?: Document[];
}

export interface FormeJuridique {
  code: string;
  label: string;
}

export interface SecteurActivite {
  code: string;
  label: string;
}

export interface RepresentantLegal {
  firstName: string;
  lastName: string;
  function: string;
  email?: string;
  phone?: string;
}

// Re-export types from person.model for consistency
export interface AddressAndCommunication {
  type: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isMain?: boolean;
}

export interface CommunicationInfo {
  email?: string;
  phone?: string;
  mobile?: string;
  preferredContact?: 'email' | 'phone' | 'mobile' | 'postal';
}

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

export interface BankingInfo {
  bankName: string;
  iban: string;
  bic: string;
  accountHolder: string;
  accountType: string;
  libelle?: string;
  debutValidite?: string;
  finValidite?: string;
  motifCloture?: string;
  autorisationPrelevement?: boolean;
  mandate?: Mandate;
}

export interface Mandate {
  reference: string;
  signatureDate: string;
  status: string;
  type: string;
}

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

export interface HistoryEntry {
  date: string;
  event: string;
  description: string;
  user: string;
  changes?: Record<string, { old: any; new: any }>;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  date: Date;
  url: string;
  size?: number;
  category?: string;
}