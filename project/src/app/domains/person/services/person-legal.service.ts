import { Injectable, signal } from '@angular/core';
import { PersonLegal, PersonLegalDetails, FormeJuridique, SecteurActivite, RepresentantLegal } from '../models/person-legal.model';
import { Document } from '@lib/components/document-viewer/document-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class PersonLegalService {
  private legalPersonsSignal = signal<PersonLegalDetails[]>([
    {
      id: 1,
      raisonSociale: 'TechCorp SARL',
      formeJuridique: {
        code: 'SARL',
        label: 'Société à Responsabilité Limitée'
      },
      secteurActivite: {
        code: '6201Z',
        label: 'Programmation informatique'
      },
      siret: '12345678901234',
      siren: '123456789',
      representantLegal: {
        firstName: 'Pierre',
        lastName: 'Durand',
        function: 'Gérant',
        email: 'p.durand@techcorp.fr',
        phone: '01 23 45 67 89'
      },
      address: {
        type: 'Siège social',
        street: '10 Rue de la Technologie',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@techcorp.fr',
        phone: '01 23 45 67 89',
        mobile: '06 12 34 56 78',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 301,
          contractNumber: 'CTR-ENT-2024-001',
          personId: 1,
          product: 'PER Collectif Entreprise',
          acquiredSavings: 150000,
          status: 'active',
          startDate: new Date('2021-01-01')
        }
      ],
      history: [
        {
          date: '2021-01-01',
          event: 'Création',
          description: 'Création du dossier entreprise',
          user: 'admin'
        },
        {
          date: '2024-01-15',
          event: 'Modification',
          description: 'Mise à jour des informations représentant légal',
          user: 'conseiller_entreprise'
        }
      ]
    },
    {
      id: 2,
      raisonSociale: 'Boulangerie Martin SA',
      formeJuridique: {
        code: 'SA',
        label: 'Société Anonyme'
      },
      secteurActivite: {
        code: '1071C',
        label: 'Boulangerie et boulangerie-pâtisserie'
      },
      siret: '98765432109876',
      siren: '987654321',
      representantLegal: {
        firstName: 'Sophie',
        lastName: 'Martin',
        function: 'Présidente',
        email: 's.martin@boulangerie-martin.fr',
        phone: '04 76 54 32 10'
      },
      address: {
        type: 'Siège social',
        street: '25 Place du Marché',
        city: 'Grenoble',
        postalCode: '38000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@boulangerie-martin.fr',
        phone: '04 76 54 32 10',
        preferredContact: 'phone'
      },
      contracts: [],
      history: [
        {
          date: '2023-06-15',
          event: 'Création',
          description: 'Création du dossier entreprise',
          user: 'admin'
        }
      ]
    },
    {
      id: 3,
      raisonSociale: 'InnovaTech SAS',
      formeJuridique: {
        code: 'SAS',
        label: 'Société par Actions Simplifiée'
      },
      secteurActivite: {
        code: '6202A',
        label: 'Conseil en systèmes et logiciels informatiques'
      },
      siret: '45678901234567',
      siren: '456789012',
      representantLegal: {
        firstName: 'Marc',
        lastName: 'Leblanc',
        function: 'Président',
        email: 'm.leblanc@innovatech.fr',
        phone: '01 45 67 89 01'
      },
      address: {
        type: 'Siège social',
        street: '15 Boulevard Haussmann',
        city: 'Paris',
        postalCode: '75009',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@innovatech.fr',
        phone: '01 45 67 89 01',
        mobile: '06 78 90 12 34',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 2301,
          contractNumber: 'CTR-ENT-2024-002',
          personId: 3,
          product: 'Article 83 Collectif',
          acquiredSavings: 280000,
          status: 'active',
          startDate: new Date('2020-03-01')
        },
        {
          id: 2302,
          contractNumber: 'CTR-ENT-2024-003',
          personId: 3,
          product: 'PER Collectif Entreprise',
          acquiredSavings: 420000,
          status: 'active',
          startDate: new Date('2022-01-01')
        }
      ],
      bankingInfo: {
        bankName: 'BNP Paribas Entreprises',
        iban: 'FR76 3000 4007 1100 0001 2345 678',
        bic: 'BNPAFRPPENT',
        accountHolder: 'InnovaTech SAS',
        accountType: 'Compte professionnel',
        libelle: 'BNP PARIBAS ENTREPRISES',
        debutValidite: '01/03/2020',
        finValidite: '01/03/2025',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-001',
          signatureDate: '2020-03-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR12456789012',
        householdReference: 'ENT456789012',
        taxSituation: 'Société',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel normal',
        regimeLocal: 'Zone urbaine',
        tauxPasrau: 28.5
      },
      history: [
        {
          date: '2020-03-01',
          event: 'Création',
          description: 'Création du dossier entreprise',
          user: 'conseiller_entreprise'
        },
        {
          date: '2022-01-01',
          event: 'Nouveau contrat',
          description: 'Migration vers PER Collectif',
          user: 'conseiller_entreprise'
        }
      ]
    },
    {
      id: 4,
      raisonSociale: 'Restaurant Le Gourmet EURL',
      formeJuridique: {
        code: 'EURL',
        label: 'Entreprise Unipersonnelle à Responsabilité Limitée'
      },
      secteurActivite: {
        code: '5610A',
        label: 'Restauration traditionnelle'
      },
      siret: '78901234567890',
      siren: '789012345',
      representantLegal: {
        firstName: 'François',
        lastName: 'Petit',
        function: 'Gérant unique',
        email: 'f.petit@legourmet.fr',
        phone: '04 42 67 89 01'
      },
      address: {
        type: 'Siège social',
        street: '8 Place Bellecour',
        city: 'Lyon',
        postalCode: '69002',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'reservation@legourmet.fr',
        phone: '04 42 67 89 01',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 2401,
          contractNumber: 'CTR-ENT-2024-004',
          personId: 4,
          product: 'Madelin Restaurant',
          acquiredSavings: 65000,
          status: 'active',
          startDate: new Date('2018-09-01')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Agricole Centre-Est',
        iban: 'FR14 1820 6000 0123 4567 8901 234',
        bic: 'AGRIFRPP882',
        accountHolder: 'Restaurant Le Gourmet EURL',
        accountType: 'Compte professionnel',
        libelle: 'CREDIT AGRICOLE CENTRE EST',
        debutValidite: '01/09/2018',
        finValidite: '01/09/2028',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-002',
          signatureDate: '2018-09-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR34789012345',
        householdReference: 'ENT789012345',
        taxSituation: 'Entreprise individuelle',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BIC',
        regimeLocal: 'Zone commerciale',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2018-09-01',
          event: 'Création',
          description: 'Ouverture du dossier restaurateur',
          user: 'conseiller_lyon'
        }
      ]
    },
    {
      id: 5,
      raisonSociale: 'Cabinet Juridique Associés',
      formeJuridique: {
        code: 'SCP',
        label: 'Société Civile Professionnelle'
      },
      secteurActivite: {
        code: '6910Z',
        label: 'Activités juridiques'
      },
      siret: '11223344556677',
      siren: '112233445',
      representantLegal: {
        firstName: 'Catherine',
        lastName: 'Moreau',
        function: 'Associée gérant',
        email: 'c.moreau@juridique-associes.fr',
        phone: '02 51 34 56 78'
      },
      address: {
        type: 'Siège social',
        street: '34 Cours Cambronne',
        city: 'Nantes',
        postalCode: '44000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@juridique-associes.fr',
        phone: '02 51 34 56 78',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 2501,
          contractNumber: 'CTR-ENT-2024-005',
          personId: 5,
          product: 'Madelin Professions Libérales',
          acquiredSavings: 195000,
          status: 'active',
          startDate: new Date('2015-06-01')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Mutuel Arkéa',
        iban: 'FR76 1558 9000 0000 1234 5678 901',
        bic: 'CMBRFR2BARK',
        accountHolder: 'Cabinet Juridique Associés',
        accountType: 'Compte professionnel',
        libelle: 'CREDIT MUTUEL ARKEA',
        debutValidite: '01/06/2015',
        finValidite: '01/06/2025',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-003',
          signatureDate: '2015-06-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR56112233445',
        householdReference: 'ENT112233445',
        taxSituation: 'Société civile',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel simplifié',
        regimeLocal: 'Zone libérale',
        tauxPasrau: 25.3
      },
      history: [
        {
          date: '2015-06-01',
          event: 'Création',
          description: 'Création du dossier professionnel',
          user: 'conseiller_nantes'
        }
      ]
    },
    {
      id: 6,
      raisonSociale: 'Garage Moderne Auto',
      formeJuridique: {
        code: 'SARL',
        label: 'Société à Responsabilité Limitée'
      },
      secteurActivite: {
        code: '4520A',
        label: 'Entretien et réparation de véhicules automobiles légers'
      },
      siret: '33445566778899',
      siren: '334455667',
      representantLegal: {
        firstName: 'Olivier',
        lastName: 'Garnier',
        function: 'Gérant',
        email: 'o.garnier@garage-moderne.fr',
        phone: '04 78 90 12 34'
      },
      address: {
        type: 'Siège social',
        street: '45 Zone Industrielle Nord',
        city: 'Villeurbanne',
        postalCode: '69100',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@garage-moderne.fr',
        phone: '04 78 90 12 34',
        mobile: '06 90 12 34 56',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 2601,
          contractNumber: 'CTR-ENT-2024-006',
          personId: 6,
          product: 'PER Collectif PME',
          acquiredSavings: 85000,
          status: 'active',
          startDate: new Date('2019-04-15')
        }
      ],
      bankingInfo: {
        bankName: 'LCL Entreprises',
        iban: 'FR14 3003 0000 0000 3344 5566 778',
        bic: 'LYONNFR2CENT',
        accountHolder: 'Garage Moderne Auto',
        accountType: 'Compte professionnel',
        libelle: 'LCL ENTREPRISES',
        debutValidite: '15/04/2019',
        finValidite: '15/04/2024',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-004',
          signatureDate: '2019-04-15',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR78334455667',
        householdReference: 'ENT334455667',
        taxSituation: 'PME',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel normal',
        regimeLocal: 'Zone industrielle',
        tauxPasrau: 33.3
      },
      history: [
        {
          date: '2019-04-15',
          event: 'Création',
          description: 'Dossier entreprise automobile',
          user: 'conseiller_lyon'
        }
      ]
    },
    {
      id: 7,
      raisonSociale: 'Pharmacie Centrale',
      formeJuridique: {
        code: 'SELARL',
        label: 'Société d\'Exercice Libéral à Responsabilité Limitée'
      },
      secteurActivite: {
        code: '4773Z',
        label: 'Commerce de détail de produits pharmaceutiques'
      },
      siret: '55667788990011',
      siren: '556677889',
      representantLegal: {
        firstName: 'Dr. Marie',
        lastName: 'Blanchard',
        function: 'Pharmacien titulaire',
        email: 'm.blanchard@pharmacie-centrale.fr',
        phone: '04 91 23 45 67'
      },
      address: {
        type: 'Siège social',
        street: '12 Place de la République',
        city: 'Marseille',
        postalCode: '13001',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@pharmacie-centrale.fr',
        phone: '04 91 23 45 67',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 2701,
          contractNumber: 'CTR-ENT-2024-007',
          personId: 7,
          product: 'Madelin Pharmacien',
          acquiredSavings: 310000,
          status: 'active',
          startDate: new Date('2014-01-01')
        }
      ],
      bankingInfo: {
        bankName: 'Société Générale Entreprises',
        iban: 'FR76 3003 0000 5566 7788 9900 112',
        bic: 'SOGEFRPPENT',
        accountHolder: 'Pharmacie Centrale',
        accountType: 'Compte professionnel santé',
        libelle: 'SOCIETE GENERALE ENTREPRISES',
        debutValidite: '01/01/2014',
        finValidite: '01/01/2024',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-005',
          signatureDate: '2014-01-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR90556677889',
        householdReference: 'ENT556677889',
        taxSituation: 'Profession libérale',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel simplifié',
        regimeLocal: 'Zone santé',
        tauxPasrau: 45.2
      },
      history: [
        {
          date: '2014-01-01',
          event: 'Création',
          description: 'Ouverture dossier professionnel santé',
          user: 'conseiller_marseille'
        }
      ]
    },
    {
      id: 8,
      raisonSociale: 'Construction Dubois & Fils',
      formeJuridique: {
        code: 'SNC',
        label: 'Société en Nom Collectif'
      },
      secteurActivite: {
        code: '4399C',
        label: 'Travaux de maçonnerie générale et gros œuvre de bâtiment'
      },
      siret: '66778899001122',
      siren: '667788990',
      representantLegal: {
        firstName: 'Robert',
        lastName: 'Dubois',
        function: 'Gérant',
        email: 'r.dubois@construction-dubois.fr',
        phone: '02 41 56 78 90'
      },
      address: {
        type: 'Siège social',
        street: '78 Route de Cholet',
        city: 'Angers',
        postalCode: '49000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@construction-dubois.fr',
        phone: '02 41 56 78 90',
        mobile: '06 34 56 78 90',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 2801,
          contractNumber: 'CTR-ENT-2024-008',
          personId: 8,
          product: 'PER Collectif BTP',
          acquiredSavings: 125000,
          status: 'active',
          startDate: new Date('2017-05-01')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Mutuel Anjou',
        iban: 'FR76 1027 8049 0000 6677 8899 001',
        bic: 'CMCIFR2A049',
        accountHolder: 'Construction Dubois & Fils',
        accountType: 'Compte professionnel BTP',
        mandate: {
          reference: 'MAN-ENT-2024-006',
          signatureDate: '2017-05-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR01667788990',
        householdReference: 'ENT667788990',
        taxSituation: 'Entreprise BTP',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France'
      },
      history: [
        {
          date: '2017-05-01',
          event: 'Création',
          description: 'Dossier entreprise BTP',
          user: 'conseiller_angers'
        }
      ]
    },
    {
      id: 9,
      raisonSociale: 'Consulting Digital Pro',
      formeJuridique: {
        code: 'SASU',
        label: 'Société par Actions Simplifiée Unipersonnelle'
      },
      secteurActivite: {
        code: '7022Z',
        label: 'Conseil pour les affaires et autres conseils de gestion'
      },
      siret: '77889900112233',
      siren: '778899001',
      representantLegal: {
        firstName: 'Julien',
        lastName: 'Roussel',
        function: 'Président',
        email: 'j.roussel@digitalpro.fr',
        phone: '05 34 67 89 01'
      },
      address: {
        type: 'Siège social',
        street: '23 Rue Lafayette',
        city: 'Toulouse',
        postalCode: '31000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'hello@digitalpro.fr',
        phone: '05 34 67 89 01',
        mobile: '07 78 90 12 34',
        preferredContact: 'email'
      },
      contracts: [],
      bankingInfo: {
        bankName: 'Banque en ligne N26',
        iban: 'FR76 3004 4000 0477 7889 9001 122',
        bic: 'NTSBDEB1',
        accountHolder: 'Consulting Digital Pro',
        accountType: 'Compte business',
        libelle: 'N26 BUSINESS',
        debutValidite: '01/08/2023',
        autorisationPrelevement: false,
        mandate: {
          reference: 'MAN-ENT-2024-007',
          signatureDate: '2023-08-01',
          status: 'En attente',
          type: 'SDD CORE'
        }
      },
      taxInfo: {
        taxNumber: 'FR23778899001',
        householdReference: 'ENT778899001',
        taxSituation: 'Micro-entreprise',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BNC',
        regimeLocal: 'Zone numérique',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2023-08-01',
          event: 'Création',
          description: 'Nouveau dossier consultant digital',
          user: 'conseiller_toulouse'
        }
      ]
    },
    {
      id: 10,
      raisonSociale: 'Ferme Bio des Coteaux',
      formeJuridique: {
        code: 'EARL',
        label: 'Exploitation Agricole à Responsabilité Limitée'
      },
      secteurActivite: {
        code: '0113Z',
        label: 'Culture de légumes, de melons, de racines et de tubercules'
      },
      siret: '88990011223344',
      siren: '889900112',
      representantLegal: {
        firstName: 'Paul',
        lastName: 'Verdier',
        function: 'Exploitant',
        email: 'p.verdier@ferme-coteaux.fr',
        phone: '04 75 23 45 67'
      },
      address: {
        type: 'Siège social',
        street: 'Lieu-dit Les Coteaux',
        city: 'Valence',
        postalCode: '26000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@ferme-coteaux.fr',
        phone: '04 75 23 45 67',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 2701,
          contractNumber: 'CTR-ENT-2024-009',
          personId: 10,
          product: 'PER Agricole',
          acquiredSavings: 45000,
          status: 'active',
          startDate: new Date('2020-01-15')
        }
      ],
      bankingInfo: {
        bankName: 'Crédit Agricole Sud Rhône Alpes',
        iban: 'FR14 1820 6026 0000 8899 0011 223',
        bic: 'AGRIFRPP826',
        accountHolder: 'Ferme Bio des Coteaux',
        accountType: 'Compte agricole',
        libelle: 'CA SUD RHONE ALPES',
        debutValidite: '15/01/2020',
        finValidite: '15/01/2025',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-008',
          signatureDate: '2020-01-15',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR45889900112',
        householdReference: 'ENT889900112',
        taxSituation: 'Exploitation agricole',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel agricole',
        regimeLocal: 'Zone rurale',
        tauxPasrau: 11.0
      },
      history: [
        {
          date: '2020-01-15',
          event: 'Création',
          description: 'Dossier exploitation agricole bio',
          user: 'conseiller_valence'
        }
      ]
    },
    {
      id: 11,
      raisonSociale: 'Architectes Créatifs Associés',
      formeJuridique: {
        code: 'SAS',
        label: 'Société par Actions Simplifiée'
      },
      secteurActivite: {
        code: '7111Z',
        label: 'Activités d\'architecture'
      },
      siret: '99001122334455',
      siren: '990011223',
      representantLegal: {
        firstName: 'Céline',
        lastName: 'Archer',
        function: 'Présidente',
        email: 'c.archer@architectes-creatifs.fr',
        phone: '01 89 01 23 45'
      },
      address: {
        type: 'Siège social',
        street: '56 Rue des Arts',
        city: 'Paris',
        postalCode: '75006',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@architectes-creatifs.fr',
        phone: '01 89 01 23 45',
        mobile: '06 12 34 56 78',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 2801,
          contractNumber: 'CTR-ENT-2024-010',
          personId: 11,
          product: 'Madelin Architecture',
          acquiredSavings: 245000,
          status: 'active',
          startDate: new Date('2016-09-01')
        },
        {
          id: 2802,
          contractNumber: 'CTR-ENT-2024-011',
          personId: 11,
          product: 'PER Collectif',
          acquiredSavings: 180000,
          status: 'active',
          startDate: new Date('2021-01-01')
        }
      ],
      bankingInfo: {
        bankName: 'BNP Paribas',
        iban: 'FR76 3000 4007 9900 1122 3344 556',
        bic: 'BNPAFRPP',
        accountHolder: 'Architectes Créatifs Associés',
        accountType: 'Compte professionnel',
        libelle: 'BNP PARIBAS',
        debutValidite: '01/09/2016',
        finValidite: '01/09/2026',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-009',
          signatureDate: '2016-09-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR67990011223',
        householdReference: 'ENT990011223',
        taxSituation: 'Profession libérale',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel simplifié',
        regimeLocal: 'Zone créative',
        tauxPasrau: 35.8
      },
      history: [
        {
          date: '2016-09-01',
          event: 'Création',
          description: 'Cabinet d\'architecture',
          user: 'conseiller_paris'
        },
        {
          date: '2021-01-01',
          event: 'Nouveau contrat',
          description: 'Migration vers PER Collectif',
          user: 'conseiller_paris'
        }
      ]
    },
    {
      id: 12,
      raisonSociale: 'Transport Express Logistics',
      formeJuridique: {
        code: 'SA',
        label: 'Société Anonyme'
      },
      secteurActivite: {
        code: '4941A',
        label: 'Transports routiers de fret interurbains'
      },
      siret: '00112233445566',
      siren: '001122334',
      representantLegal: {
        firstName: 'Michel',
        lastName: 'Transport',
        function: 'Directeur Général',
        email: 'm.transport@express-logistics.fr',
        phone: '03 89 12 34 56'
      },
      address: {
        type: 'Siège social',
        street: '123 Zone d\'Activité du Port',
        city: 'Strasbourg',
        postalCode: '67000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'contact@express-logistics.fr',
        phone: '03 89 12 34 56',
        mobile: '06 45 67 89 01',
        preferredContact: 'email'
      },
      contracts: [
        {
          id: 2901,
          contractNumber: 'CTR-ENT-2024-012',
          personId: 12,
          product: 'PER Collectif Transport',
          acquiredSavings: 380000,
          status: 'active',
          startDate: new Date('2018-03-01')
        }
      ],
      bankingInfo: {
        bankName: 'Société Générale',
        iban: 'FR76 3003 0000 0011 2233 4455 667',
        bic: 'SOGEFRPP',
        accountHolder: 'Transport Express Logistics',
        accountType: 'Compte pro transport',
        libelle: 'SOCIETE GENERALE',
        debutValidite: '01/03/2018',
        finValidite: '01/03/2023',
        motifCloture: 'Changement de banque',
        autorisationPrelevement: false,
        mandate: {
          reference: 'MAN-ENT-2024-010',
          signatureDate: '2018-03-01',
          status: 'Actif',
          type: 'B2B'
        }
      },
      taxInfo: {
        taxNumber: 'FR89001122334',
        householdReference: 'ENT001122334',
        taxSituation: 'Grande entreprise',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Réel normal',
        regimeLocal: 'Zone logistique',
        tauxPasrau: 33.3
      },
      history: [
        {
          date: '2018-03-01',
          event: 'Création',
          description: 'Dossier entreprise transport',
          user: 'conseiller_strasbourg'
        }
      ]
    },
    {
      id: 13,
      raisonSociale: 'Coiffure Tendance',
      formeJuridique: {
        code: 'SARL',
        label: 'Société à Responsabilité Limitée'
      },
      secteurActivite: {
        code: '9602A',
        label: 'Coiffure'
      },
      siret: '12233445566778',
      siren: '122334455',
      representantLegal: {
        firstName: 'Nathalie',
        lastName: 'Coiffure',
        function: 'Gérante',
        email: 'n.coiffure@tendance.fr',
        phone: '04 67 12 34 56'
      },
      address: {
        type: 'Siège social',
        street: '9 Rue du Commerce',
        city: 'Montpellier',
        postalCode: '34000',
        country: 'France',
        isMain: true
      },
      communication: {
        email: 'rdv@coiffure-tendance.fr',
        phone: '04 67 12 34 56',
        preferredContact: 'phone'
      },
      contracts: [
        {
          id: 3001,
          contractNumber: 'CTR-ENT-2024-013',
          personId: 13,
          product: 'PER Collectif Services',
          acquiredSavings: 28000,
          status: 'pending',
          startDate: new Date('2024-01-15')
        }
      ],
      bankingInfo: {
        bankName: 'Caisse d\'Épargne Languedoc',
        iban: 'FR76 1751 2034 0012 2334 4556 677',
        bic: 'CEPAFRPP751',
        accountHolder: 'Coiffure Tendance',
        accountType: 'Compte professionnel',
        libelle: 'CAISSE EPARGNE LANGUEDOC',
        debutValidite: '15/01/2024',
        autorisationPrelevement: true,
        mandate: {
          reference: 'MAN-ENT-2024-011',
          signatureDate: '2024-01-15',
          status: 'En cours',
          type: 'SDD CORE'
        }
      },
      taxInfo: {
        taxNumber: 'FR12122334455',
        householdReference: 'ENT122334455',
        taxSituation: 'TPE Services',
        taxResidence: 'France',
        fatcaStatus: false,
        countryOfResidence: 'France',
        regime: 'Micro-BIC',
        regimeLocal: 'Zone commerciale',
        tauxPasrau: 22.0
      },
      history: [
        {
          date: '2024-01-15',
          event: 'Création',
          description: 'Nouveau salon de coiffure',
          user: 'conseiller_montpellier'
        }
      ]
    }
  ]);

  // Methods for accessing the data
  getAllLegalPersons(): PersonLegalDetails[] {
    return this.legalPersonsSignal();
  }

  getLegalPersonById(id: number): PersonLegalDetails | undefined {
    return this.legalPersonsSignal().find(person => person.id === id);
  }

  searchLegalPersons(query: string): PersonLegalDetails[] {
    if (!query.trim()) {
      return this.legalPersonsSignal();
    }

    const searchTerm = query.toLowerCase();
    return this.legalPersonsSignal().filter((person: PersonLegalDetails) =>
      person.raisonSociale.toLowerCase().includes(searchTerm) ||
      person.siret.includes(searchTerm) ||
      person.siren.includes(searchTerm) ||
      person.communication?.email?.toLowerCase().includes(searchTerm) ||
      person.representantLegal?.firstName.toLowerCase().includes(searchTerm) ||
      person.representantLegal?.lastName.toLowerCase().includes(searchTerm)
    );
  }

  createLegalPerson(person: Omit<PersonLegalDetails, 'id'>): PersonLegalDetails {
    const newId = Math.max(...this.legalPersonsSignal().map(p => p.id)) + 1;
    const newPerson: PersonLegalDetails = { ...person, id: newId };
    
    this.legalPersonsSignal.update(persons => [...persons, newPerson]);
    return newPerson;
  }

  updateLegalPerson(id: number, updates: Partial<PersonLegalDetails>): PersonLegalDetails | undefined {
    const personIndex = this.legalPersonsSignal().findIndex(p => p.id === id);
    if (personIndex === -1) return undefined;

    this.legalPersonsSignal.update(persons => {
      const updated = [...persons];
      
      // Update properties individually to maintain type safety
      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && value !== undefined) {
          (updated[personIndex] as any)[key] = value;
        }
      });
      
      return updated;
    });

    return this.legalPersonsSignal()[personIndex];
  }

  deleteLegalPerson(id: number): boolean {
    const initialLength = this.legalPersonsSignal().length;
    this.legalPersonsSignal.update(persons => persons.filter(p => p.id !== id));
    return this.legalPersonsSignal().length < initialLength;
  }

  getLegalPersonDocuments(personId: number): Document[] {
    // Simulation de documents pour personne morale
    return [
      {
        id: 1,
        name: 'Extrait K-bis',
        type: 'PDF',
        date: new Date('2024-01-01'),
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        id: 2,
        name: 'Statuts de la société',
        type: 'PDF',
        date: new Date('2023-12-15'),
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    ];
  }
}