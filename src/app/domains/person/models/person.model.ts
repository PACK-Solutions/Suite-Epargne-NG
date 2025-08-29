export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  civility: string;
  birthDate: string;
  birthPlace?: string;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  matrimonialRegime?: string;
  address?: AddressAndCommunication;
  communication?: CommunicationInfo;
  contracts?: Contract[];
  bankingInfo?: BankingInfo;
  taxInfo?: TaxInfo;
  history?: HistoryEntry[];
}

import { TaxInfo } from './tax-info.model';
import { BankingInfo } from './banking-info.model';

export interface PersonDetails extends Person {
  // Informations détaillées pour la vue
  guardianshipInfo?: GuardianshipInfo;
  professionalInfo?: ProfessionalInfo;
  documents?: Document[];
  deathStatus?: 'deceased' | 'suspected_death' | null;
}

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
  // Informations détaillées pour la vue
  documents?: Document[];
}

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

export interface CivilityInfo {
  civility: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  birthDate: string;
  birthPlace?: string;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  matrimonialRegime?: string;
}

export interface GuardianshipInfo {
  type: GuardianshipType;
  guardianName?: string;
  guardianContact?: string;
  startDate?: string;
  endDate?: string;
}

export interface ProfessionalInfo {
  profession?: string;
  employer?: string;
  sector?: string;
  income?: number;
  employmentType?: 'employee' | 'self-employed' | 'retired' | 'unemployed';
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

export interface Document {
  id: number;
  name: string;
  type: string;
  date: Date;
  url: string;
  size?: number;
  category?: string;
}

export interface HistoryEntry {
  date: string;
  event: string;
  description: string;
  user: string;
  changes?: Record<string, { old: any; new: any }>;
}

import { Contract } from './contract.model';

export interface Mandate {
  reference: string;
  signatureDate: string;
  status: string;
  type: string;
}

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'pacs';
export type GuardianshipType = 'none' | 'curatorship' | 'guardianship' | 'safeguard';