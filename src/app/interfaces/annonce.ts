export  interface Address {
  ville: string;
  address: string;
}

export  interface Annonce {
  user_Id: string; // Assuming user_Id is a string representation of mongoose.Schema.Types.ObjectId
  titre: string;
  lieu_depart: Address;
  lieu_arrive: Address;
  heure_depart: Date;
  type: 'Co-Voiturage' | 'Livraison' | 'Taxi';
  status: 'actif' | 'brouillant' | 'archivé';
  createdAt: Date;
  updatedAt: Date;
}
