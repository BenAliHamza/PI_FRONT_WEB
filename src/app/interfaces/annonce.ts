export  interface Address {
  ville: any;
  address: any;
}

export  interface Annonce {
  user_Id: any; // Assuming user_Id is a string representation of mongoose.Schema.Types.ObjectId
  titre: string;
  lieu_depart: Address;
  lieu_arrive: Address;
  heure_depart: Date;
  type: 'Co-Voiturage' | 'Livraison' | 'Taxi';
  status: 'actif' | 'brouillant' | 'archivé';
  _id?:string
}
