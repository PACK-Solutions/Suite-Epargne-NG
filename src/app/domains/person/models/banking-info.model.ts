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