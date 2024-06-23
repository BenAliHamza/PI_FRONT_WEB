// src/interfaces/reponse.ts

    export interface Reponse {
    id?: string; // ID optionnel
    reclamation: string; // ID de la réclamation à laquelle cette réponse appartient
    reponse: string; // Le message de la réponse
    createdAt: Date; // Date de création de la réponse
    updatedAt?: Date; // Date de mise à jour de la réponse, optionnel
    expediteur: string; // ID de l'utilisateur qui a créé la réponse
  }