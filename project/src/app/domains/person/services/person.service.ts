import { Injectable, signal } from '@angular/core';
import { PersonDetails } from '../models/person.model';
import { Document } from '@lib/components/document-viewer/document-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personsSignal = signal<PersonDetails[]>([
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      civility: 'M.',
      birthDate: '1985-03-15',
      birthPlace: 'Lyon',
      nationality: 'Française',
      maritalStatus: 'married',
      matrimonialRegime: 'Communauté réduite aux acquêts',
      address: {
        type: 'Domicile',
        street: '123 Rue de la République',
        city: 'Lyon',
        postalCode: '69001',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'jean.dupont@email.fr',
        phone: '04 78 12 34 56',
        mobile: '06 12 34 56 78',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 101,
          contractNumber: 'CTR-2024-001',
          personId: 1,
          product: 'PER Individuel',
          acquiredSavings: 25000,
          status: 'active',
          startDate: new Date('2020-01-15')
        },
        {
          id: 102,
          contractNumber: 'CTR-2024-002',
          personId: 1,
          product: 'Assurance Vie',
          acquiredSavings: 45000,
          status: 'active',
          startDate: new Date('2018-06-10')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Lyonnais',
        iban: 'FR76 3000 1007 9412 3456 7890 185',
        bic: 'LYONFRPP',
        accountHolder: 'Jean Dupont',
        accountType: 'Compte courant',
        libelle: 'CREDIT LYONNAIS',
        debutValidite: '15/01/2020',
        finValidite: '15/01/2025',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-001',
          signatureDate: '2020-01-15',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1850315123456',
        householdReference: '1850315001',
        taxSituation: 'Marié',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel simplifié',
        regimeLocal: 'Zone urbaine',
        tauxPasrau: 11.5
      },
      history: [
        {
          date: '2020-01-15',
          event: 'Création',
          description: 'Création du dossier client',
          user: 'conseiller_lyon'
        },
        {
          date: '2024-01-10',
          event: 'Modification',
          description: 'Mise à jour coordonnées bancaires',
          user: 'conseiller_lyon'
        }
      ],
      deathStatus: null
    },
    {
      id: 2,
      firstName: 'Marie',
      lastName: 'Martin',
      civility: 'Mme',
      birthDate: '1978-08-22',
      birthPlace: 'Marseille',
      nationality: 'Française',
      maritalStatus: 'single',
      address: {
        type: 'Domicile',
        street: '45 Avenue du Prado',
        city: 'Marseille',
        postalCode: '13008',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'marie.martin@outlook.fr',
        phone: '04 91 23 45 67',
        mobile: '06 23 45 67 89',
        preferredContact: 'mobile'
      },
      contracts: [
        {
          id: 201,
          contractNumber: 'CTR-2024-003',
          personId: 2,
          product: 'PER Collectif',
          acquiredSavings: 15000,
          status: 'active',
          startDate: new Date('2022-03-01')
        }
      ],
      bankingInfo: {
        bankName: 'BNP Paribas',
        iban: 'FR14 3000 4007 1100 0001 2345 679',
        bic: 'BNPAFRPP',
        accountHolder: 'Marie Martin',
        accountType: 'Livret A',
        libelle: 'BNP PARIBAS',
        debutValidite: '01/03/2022',
        finValidite: '01/03/2027',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-002',
          signatureDate: '2022-03-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1780822234567',
        householdReference: '1780822001',
        taxSituation: 'Célibataire',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BNC',
        regimeLocal: 'Zone côtière',
        tauxPasrau: 14.2
      },
      history: [
        {
          date: '2022-03-01',
          event: 'Création',
          description: 'Ouverture du compte',
          user: 'conseiller_marseille'
        }
      ],
      deathStatus: null
    },
    {
      id: 3,
      firstName: 'Pierre',
      lastName: 'Durand',
      civility: 'M.',
      birthDate: '1965-11-30',
      birthPlace: 'Toulouse',
      nationality: 'Française',
      maritalStatus: 'divorced',
      matrimonialRegime: 'Séparation de biens',
      address: {
        type: 'Domicile',
        street: '78 Rue des Capitouls',
        city: 'Toulouse',
        postalCode: '31000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'p.durand@gmail.com',
        phone: '05 61 12 34 56',
        mobile: '06 34 56 78 90',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 301,
          contractNumber: 'CTR-2024-004',
          personId: 3,
          product: 'Assurance Vie',
          acquiredSavings: 87500,
          status: 'active',
          startDate: new Date('2015-09-01')
        },
        {
          id: 302,
          contractNumber: 'CTR-2024-005',
          personId: 3,
          product: 'PER Individuel',
          acquiredSavings: 32000,
          status: 'pending',
          startDate: new Date('2024-01-01')
        }
      ],
      bankingInfo: {
        bankName: 'Société Générale',
        iban: 'FR76 3003 0000 0300 1234 5678 902',
        bic: 'SOGEFRPP',
        accountHolder: 'Pierre Durand',
        accountType: 'Compte épargne',
        libelle: 'SOCIETE GENERALE',
        debutValidite: '01/09/2015',
        finValidite: '01/09/2025',
        autorisationPrelevement: false,
        mandate: {
          reference: 'MAN-2024-003',
          signatureDate: '2015-09-01',
          status: 'Révoqué',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1651130345678',
        householdReference: '1651130002',
        taxSituation: 'Divorcé',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel normal',
        regimeLocal: 'Zone péri-urbaine',
        tauxPasrau: 30.0
      },
      history: [
        {
          date: '2015-09-01',
          event: 'Création',
          description: 'Premier contrat souscrit',
          user: 'conseiller_toulouse'
        },
        {
          date: '2020-06-15',
          event: 'Divorce',
          description: 'Changement de situation familiale',
          user: 'conseiller_toulouse'
        }
      ],
      deathStatus: null
    },
    {
      id: 4,
      firstName: 'Sophie',
      lastName: 'Leroy',
      civility: 'Mme',
      birthDate: '1992-07-08',
      birthPlace: 'Lille',
      nationality: 'Française',
      maritalStatus: 'single',
      address: {
        type: 'Domicile',
        street: '12 Place du Général de Gaulle',
        city: 'Lille',
        postalCode: '59000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'sophie.leroy@yahoo.fr',
        phone: '03 20 45 67 89',
        mobile: '07 45 67 89 01',
        preferredContact: 'email'
      },
      contracts: [],
      bankingInfo: {
        bankName: 'Crédit Mutuel Nord Europe',
        iban: 'FR76 1027 8000 0000 1234 5678 903',
        bic: 'CMCIFR2A',
        accountHolder: 'Sophie Leroy',
        accountType: 'Compte jeune',
        libelle: 'CREDIT MUTUEL NORD EUROPE',
        debutValidite: '08/07/2018',
        finValidite: '08/07/2023',
        motifCloture: 'Changement d\'offre',
        autorisationPrelevement: false
      },
      taxInfo: {
        taxNumber: '1920708456789',
        householdReference: '1920708001',
        taxSituation: 'Célibataire',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BIC',
        regimeLocal: 'Zone urbaine',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2018-07-08',
          event: 'Création',
          description: 'Ouverture compte jeune',
          user: 'conseiller_lille'
        }
      ],
      deathStatus: null
    },
    {
      id: 5,
      firstName: 'Antoine',
      lastName: 'Bernard',
      civility: 'M.',
      birthDate: '1973-12-05',
      birthPlace: 'Nantes',
      nationality: 'Française',
      maritalStatus: 'married',
      matrimonialRegime: 'Séparation de biens',
      address: {
        type: 'Domicile',
        street: '89 Cours Saint-Pierre',
        city: 'Nantes',
        postalCode: '44000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'antoine.bernard@free.fr',
        phone: '02 40 56 78 90',
        mobile: '06 56 78 90 12',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 501,
          contractNumber: 'CTR-2024-006',
          personId: 5,
          product: 'Madelin',
          acquiredSavings: 125000,
          status: 'active',
          startDate: new Date('2010-04-01')
        }
      ],
      bankingInfo: {
        bankName: 'Caisse d\'Épargne Loire-Atlantique',
        iban: 'FR76 1751 2000 0000 5678 9012 345',
        bic: 'CEPAFRPP751',
        accountHolder: 'Antoine Bernard',
        accountType: 'LEP',
        libelle: 'CAISSE EPARGNE LOIRE ATLANTIQUE',
        debutValidite: '01/04/2010',
        finValidite: '01/04/2030',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-004',
          signatureDate: '2010-04-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1731205567890',
        householdReference: '1731205003',
        taxSituation: 'Marié',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel normal',
        regimeLocal: 'Zone urbaine',
        tauxPasrau: 45.0
      },
      history: [
        {
          date: '2010-04-01',
          event: 'Création',
          description: 'Souscription Madelin',
          user: 'conseiller_nantes'
        }
      ],
      deathStatus: null
    },
    {
      id: 6,
      firstName: 'Isabelle',
      lastName: 'Moreau',
      civility: 'Mme',
      birthDate: '1988-01-18',
      birthPlace: 'Strasbourg',
      nationality: 'Française',
      maritalStatus: 'pacs',
      address: {
        type: 'Domicile',
        street: '67 Rue du Faubourg National',
        city: 'Strasbourg',
        postalCode: '67000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'i.moreau@hotmail.fr',
        phone: '03 88 67 89 01',
        mobile: '06 67 89 01 23',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 601,
          contractNumber: 'CTR-2024-007',
          personId: 6,
          product: 'PER Individuel',
          acquiredSavings: 18500,
          status: 'active',
          startDate: new Date('2021-11-01')
        }
      ],
      bankingInfo: {
        bankName: 'CIC Est',
        iban: 'FR76 3006 6100 0000 6789 0123 456',
        bic: 'CMCIFRPP',
        accountHolder: 'Isabelle Moreau',
        accountType: 'Compte joint',
        libelle: 'CIC EST',
        debutValidite: '01/11/2021',
        finValidite: '01/11/2026',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-005',
          signatureDate: '2021-11-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1880118678901',
        householdReference: '1880118004',
        taxSituation: 'Pacsée',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BNC',
        regimeLocal: 'Zone frontalière',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2021-11-01',
          event: 'Création',
          description: 'Nouveau client',
          user: 'conseiller_strasbourg'
        }
      ],
      deathStatus: null
    },
    {
      id: 7,
      firstName: 'François',
      lastName: 'Petit',
      civility: 'M.',
      birthDate: '1960-04-12',
      birthPlace: 'Bordeaux',
      nationality: 'Française',
      maritalStatus: 'widowed',
      matrimonialRegime: 'Communauté universelle',
      address: {
        type: 'Domicile',
        street: '34 Cours de l\'Intendance',
        city: 'Bordeaux',
        postalCode: '33000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'f.petit@wanadoo.fr',
        phone: '05 56 78 90 12',
        mobile: '06 78 90 12 34',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 701,
          contractNumber: 'CTR-2024-008',
          personId: 7,
          product: 'Assurance Vie',
          acquiredSavings: 245000,
          status: 'active',
          startDate: new Date('1995-01-01')
        },
        {
          id: 702,
          contractNumber: 'CTR-2024-009',
          personId: 7,
          product: 'PER Individuel',
          acquiredSavings: 156000,
          status: 'closed',
          startDate: new Date('2000-06-01'),
          endDate: new Date('2023-12-31')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Agricole Aquitaine',
        iban: 'FR14 1820 6000 0000 7890 1234 567',
        bic: 'AGRIFRPP820',
        accountHolder: 'François Petit',
        accountType: 'PEL',
        libelle: 'CA AQUITAINE',
        debutValidite: '01/01/1995',
        finValidite: '31/12/2023',
        motifCloture: 'Arrivée à échéance',
        autorisationPrelevement: false
      },
      taxInfo: {
        taxNumber: '1600412789012',
        householdReference: '1600412005',
        taxSituation: 'Veuf',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel simplifié',
        regimeLocal: 'Zone viticole',
        tauxPasrau: 45.0
      },
      history: [
        {
          date: '1995-01-01',
          event: 'Création',
          description: 'Premier contrat',
          user: 'conseiller_bordeaux'
        },
        {
          date: '2023-12-31',
          event: 'Clôture',
          description: 'Fermeture PER arrivé à échéance',
          user: 'conseiller_bordeaux'
        }
      ],
      deathStatus: 'deceased'  // Exemple d'une personne décédée
    },
    {
      id: 8,
      firstName: 'Carmen',
      lastName: 'Rodriguez',
      civility: 'Mme',
      birthDate: '1985-09-25',
      birthPlace: 'Perpignan',
      nationality: 'Espagnole',
      maritalStatus: 'married',
      matrimonialRegime: 'Communauté réduite aux acquêts',
      address: {
        type: 'Domicile',
        street: '56 Avenue Jean Jaurès',
        city: 'Perpignan',
        postalCode: '66000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'carmen.rodriguez@orange.fr',
        phone: '04 68 34 56 78',
        mobile: '06 89 01 23 45',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 801,
          contractNumber: 'CTR-2024-010',
          personId: 8,
          product: 'Assurance Vie Européenne',
          acquiredSavings: 62000,
          status: 'active',
          startDate: new Date('2019-05-15')
        }
      ],
      bankingInfo: {
        bankName: 'Banque Populaire du Sud',
        iban: 'ES91 2100 0418 4500 0012 3456',
        bic: 'CAIXESBB',
        accountHolder: 'Carmen Rodriguez',
        accountType: 'Compte international',
        libelle: 'BANQUE POPULAIRE DU SUD',
        debutValidite: '15/05/2019',
        finValidite: '15/05/2024',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-006',
          signatureDate: '2019-05-15',
          status: 'Actif',
          type: 'COR1'
        }
      },
      taxInfo: {
        taxNumber: 'ES85092567890',
        householdReference: 'ES85092567890',
        taxSituation: 'Résidente étrangère',
        taxResidence: 'Espagne',
        fatcaStatus: true,
        countryOfResidence: 'France',
        regime: 'Convention fiscale',
        regimeLocal: 'Zone frontalière',
        tauxPasrau: 19.0
      },
      history: [
        {
          date: '2019-05-15',
          event: 'Création',
          description: 'Client international',
          user: 'conseiller_perpignan'
        }
      ],
      deathStatus: null
    },
    {
      id: 9,
      firstName: 'Julien',
      lastName: 'Roussel',
      civility: 'M.',
      birthDate: '1995-02-14',
      birthPlace: 'Tours',
      nationality: 'Française',
      maritalStatus: 'single',
      address: {
        type: 'Domicile',
        street: '23 Rue Nationale',
        city: 'Tours',
        postalCode: '37000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'julien.roussel@protonmail.com',
        phone: '02 47 90 12 34',
        mobile: '07 90 12 34 56',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 901,
          contractNumber: 'CTR-2024-011',
          personId: 9,
          product: 'PER Individuel Jeune',
          acquiredSavings: 8500,
          status: 'active',
          startDate: new Date('2023-02-14')
        }
      ],
      bankingInfo: {
        bankName: 'Revolut',
        iban: 'GB29 REVO 0099 6958 0123 456',
        bic: 'REVOGB21',
        accountHolder: 'Julien Roussel',
        accountType: 'Compte digital',
        libelle: 'REVOLUT',
        debutValidite: '14/02/2023',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-007',
          signatureDate: '2023-02-14',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1950214901234',
        householdReference: '1950214006',
        taxSituation: 'Célibataire',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BNC',
        regimeLocal: 'Zone numérique',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2023-02-14',
          event: 'Création',
          description: 'Nouveau client jeune',
          user: 'conseiller_tours'
        }
      ],
      deathStatus: 'suspected_death'  // Exemple d'une suspicion de décès
    },
    {
      id: 10,
      firstName: 'Fatima',
      lastName: 'El Mansouri',
      civility: 'Mme',
      birthDate: '1982-06-03',
      birthPlace: 'Casablanca',
      nationality: 'Marocaine',
      maritalStatus: 'married',
      matrimonialRegime: 'Régime légal marocain',
      address: {
        type: 'Domicile',
        street: '145 Boulevard Voltaire',
        city: 'Paris',
        postalCode: '75011',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'fatima.elmansouri@gmail.com',
        phone: '01 43 78 90 12',
        mobile: '07 01 23 45 67',
        preferredContact: 'mobile'
      },
      contracts: [
        {
          id: 1001,
          contractNumber: 'CTR-2024-012',
          personId: 10,
          product: 'Assurance Vie Internationale',
          acquiredSavings: 35000,
          status: 'active',
          startDate: new Date('2020-08-01')
        }
      ],
      bankingInfo: {
        bankName: 'LCL Paris République',
        iban: 'FR76 3003 0000 0000 1012 3456 789',
        bic: 'LYONNFR2',
        accountHolder: 'Fatima El Mansouri',
        accountType: 'Compte résidents étrangers',
        libelle: 'LCL PARIS REPUBLIQUE',
        debutValidite: '01/08/2020',
        finValidite: '01/08/2025',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-008',
          signatureDate: '2020-08-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1820603012345',
        householdReference: 'MA82060301',
        taxSituation: 'Résidente étrangère',
        taxResidence: 'Maroc',
        fatcaStatus: true,
        countryOfResidence: 'France',
        regime: 'Convention fiscale',
        regimeLocal: 'Zone internationale',
        tauxPasrau: 30.0
      },
      history: [
        {
          date: '2020-08-01',
          event: 'Création',
          description: 'Cliente résidente étrangère',
          user: 'conseiller_paris_international'
        }
      ],
      deathStatus: null
    },
    {
      id: 11,
      firstName: 'Thierry',
      lastName: 'Garnier',
      civility: 'M.',
      birthDate: '1968-10-20',
      birthPlace: 'Nice',
      nationality: 'Française',
      maritalStatus: 'divorced',
      matrimonialRegime: 'Participation aux acquêts',
      address: {
        type: 'Domicile',
        street: '88 Promenade des Anglais',
        city: 'Nice',
        postalCode: '06000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'thierry.garnier@sfr.fr',
        phone: '04 93 01 23 45',
        mobile: '06 12 34 56 78',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 1101,
          contractNumber: 'CTR-2024-013',
          personId: 11,
          product: 'PER Individuel Côte d\'Azur',
          acquiredSavings: 78000,
          status: 'active',
          startDate: new Date('2008-03-01')
        },
        {
          id: 1102,
          contractNumber: 'CTR-2024-014',
          personId: 11,
          product: 'Assurance Vie Premium',
          acquiredSavings: 195000,
          status: 'active',
          startDate: new Date('2012-06-15')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Agricole Alpes Provence',
        iban: 'FR76 1820 6000 1100 1123 4567 890',
        bic: 'AGRIFRPP820',
        accountHolder: 'Thierry Garnier',
        accountType: 'Compte privilège',
        libelle: 'CA ALPES PROVENCE',
        debutValidite: '01/03/2008',
        finValidite: '01/03/2028',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-009',
          signatureDate: '2008-03-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1681020123456',
        householdReference: '1681020007',
        taxSituation: 'Divorcé',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel normal',
        regimeLocal: 'Zone côtière',
        tauxPasrau: 45.0
      },
      history: [
        {
          date: '2008-03-01',
          event: 'Création',
          description: 'Premier contrat PER',
          user: 'conseiller_nice'
        },
        {
          date: '2018-09-15',
          event: 'Divorce',
          description: 'Changement situation familiale',
          user: 'conseiller_nice'
        }
      ],
      deathStatus: null
    },
    {
      id: 12,
      firstName: 'Céline',
      lastName: 'Archer',
      civility: 'Mme',
      birthDate: '1990-11-07',
      birthPlace: 'Rennes',
      nationality: 'Française',
      maritalStatus: 'single',
      address: {
        type: 'Domicile',
        street: '67 Rue Saint-Malo',
        city: 'Rennes',
        postalCode: '35000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'celine.archer@icloud.com',
        phone: '02 99 12 34 56',
        mobile: '07 23 45 67 89',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 1201,
          contractNumber: 'CTR-2024-015',
          personId: 12,
          product: 'PER Individuel Eco',
          acquiredSavings: 12000,
          status: 'pending',
          startDate: new Date('2024-01-01')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Mutuel Arkéa',
        iban: 'FR76 1558 9000 0012 3456 7890 123',
        bic: 'CMBRFR2BARK',
        accountHolder: 'Céline Archer',
        accountType: 'Compte éco-responsable',
        libelle: 'CREDIT MUTUEL ARKEA',
        debutValidite: '01/01/2024',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-010',
          signatureDate: '2024-01-01',
          status: 'En cours',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1901107234567',
        householdReference: '1901107008',
        taxSituation: 'Célibataire',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BIC',
        regimeLocal: 'Zone urbaine',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2024-01-01',
          event: 'Création',
          description: 'Nouvelle souscription eco',
          user: 'conseiller_rennes'
        }
      ],
      deathStatus: null
    },
    {
      id: 13,
      firstName: 'Mohamed',
      lastName: 'Benali',
      civility: 'M.',
      birthDate: '1975-05-14',
      birthPlace: 'Rabat',
      nationality: 'Marocaine',
      maritalStatus: 'married',
      matrimonialRegime: 'Séparation de biens',
      address: {
        type: 'Domicile',
        street: '92 Boulevard de Belleville',
        city: 'Paris',
        postalCode: '75020',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'm.benali@laposte.net',
        phone: '01 43 66 77 88',
        mobile: '06 55 66 77 88',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 1301,
          contractNumber: 'CTR-2024-016',
          personId: 13,
          product: 'PER Résidents Étrangers',
          acquiredSavings: 42000,
          status: 'active',
          startDate: new Date('2016-07-01')
        }
      ],
      bankingInfo: {
        bankName: 'La Banque Postale',
        iban: 'FR76 2004 1000 0112 3456 7890 134',
        bic: 'PSSTFRPPPAR',
        accountHolder: 'Mohamed Benali',
        accountType: 'Livret d\'épargne',
        libelle: 'LA BANQUE POSTALE',
        debutValidite: '01/07/2016',
        finValidite: '01/07/2026',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-011',
          signatureDate: '2016-07-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: 'MA75051445678',
        householdReference: 'MA75051445678',
        taxSituation: 'Résident étranger',
        taxResidence: 'Maroc',
        fatcaStatus: true,
        countryOfResidence: 'France',
        regime: 'Convention fiscale',
        regimeLocal: 'Zone métropolitaine',
        tauxPasrau: 30.0
      },
      history: [
        {
          date: '2016-07-01',
          event: 'Création',
          description: 'Dossier résident étranger',
          user: 'conseiller_paris_20'
        }
      ],
      deathStatus: null
    },
    {
      id: 14,
      firstName: 'Camille',
      lastName: 'Simon',
      civility: 'Mme',
      birthDate: '1987-12-28',
      birthPlace: 'Montpellier',
      nationality: 'Française',
      maritalStatus: 'pacs',
      address: {
        type: 'Domicile',
        street: '101 Avenue de la Liberté',
        city: 'Montpellier',
        postalCode: '34000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'camille.simon@live.fr',
        phone: '04 67 89 01 23',
        mobile: '06 12 34 56 78',
        preferredContact: 'mobile'
      },
      contracts: [
        {
          id: 1401,
          contractNumber: 'CTR-2024-017',
          personId: 14,
          product: 'PER Individuel PACS',
          acquiredSavings: 22500,
          status: 'active',
          startDate: new Date('2021-12-01')
        }
      ],
      bankingInfo: {
        bankName: 'Banque Populaire du Sud',
        iban: 'FR76 1470 7000 0014 0123 4567 890',
        bic: 'CCBPFRPPMON',
        accountHolder: 'Camille Simon',
        accountType: 'Compte PACS',
        libelle: 'BANQUE POPULAIRE DU SUD',
        debutValidite: '01/12/2021',
        finValidite: '01/12/2026',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-2024-012',
          signatureDate: '2021-12-01',
          status: 'Actif',
          type: 'CORE'
        }
      },
      taxInfo: {
        taxNumber: '1871228345678',
        householdReference: '1871228009',
        taxSituation: 'Pacsée',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel simplifié',
        regimeLocal: 'Zone méditerranéenne',
        tauxPasrau: 11.5
      },
      history: [
        {
          date: '2021-12-01',
          event: 'Création',
          description: 'Souscription en PACS',
          user: 'conseiller_montpellier'
        }
      ],
      deathStatus: null
    }
  ]);

  // Methods for accessing the data
  getAllPersons(): PersonDetails[] {
    return this.personsSignal();
  }

  getPersonById(id: number): PersonDetails | undefined {
    return this.personsSignal().find(person => person.id === id);
  }

  searchPersons(query: string): PersonDetails[] {
    if (!query.trim()) {
      return this.personsSignal();
    }

    const searchTerm = query.toLowerCase();
    return this.personsSignal().filter((person: PersonDetails) =>
      person.firstName.toLowerCase().includes(searchTerm) ||
      person.lastName.toLowerCase().includes(searchTerm) ||
      person.communication?.email?.toLowerCase().includes(searchTerm)
    );
  }

  createPerson(person: Omit<PersonDetails, 'id'>): PersonDetails {
    const newId = Math.max(...this.personsSignal().map(p => p.id)) + 1;
    const newPerson: PersonDetails = { ...person, id: newId };
    this.personsSignal.update(persons => [...persons, newPerson]);
    return newPerson;
  }

  updatePerson(id: number, updates: Partial<PersonDetails>): PersonDetails | undefined {
    const personIndex = this.personsSignal().findIndex(p => p.id === id);
    if (personIndex === -1) return undefined;

    this.personsSignal.update(persons => {
      const updated = [...persons];
      
      // Update properties individually to maintain type safety
      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && value !== undefined) {
          (updated[personIndex] as any)[key] = value;
        }
      });
      
      return updated;
    });
    return this.personsSignal()[personIndex];
  }

  deletePerson(id: number): boolean {
    const initialLength = this.personsSignal().length;
    this.personsSignal.update(persons => persons.filter(p => p.id !== id));
    return this.personsSignal().length < initialLength;
  }

  getPersonDocuments(personId: number): Document[] {
    // Simulation de documents pour personne physique
    return [
      {
        id: 1,
        name: 'Pièce d\'identité',
        type: 'PDF',
        date: new Date('2024-01-01'),
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        id: 2,
        name: 'Justificatif de domicile',
        type: 'PDF',
        date: new Date('2023-12-15'),
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    ];
  }
}