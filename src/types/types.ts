// types.ts
export interface InfoEntreprise {
    effectif?: number;
    estBeneficiaire?: string;
    beneficiaire3ans?: string;
    beneficeMoyen?: number;
  }
  
  export interface ObjectifsFinanciers {
    caAnneeN1: number;
    caObjectifMin: number;
    caObjectifMax: number;
    caProjection: number;
    ppvPourcentageMin: number;
    ppvPourcentageMax: number;
  }
  
  export interface ModalitesPrime {
    nombreBeneficiaires: number;
    criteres: string[];
  }
  
  export interface Donnees {
    infoEntreprise: InfoEntreprise;
    objectifs: string[];
    objectifsFinanciers: ObjectifsFinanciers;
    modalitesPrime: ModalitesPrime;
    resultats: Record<string, unknown>;
  }
  
  