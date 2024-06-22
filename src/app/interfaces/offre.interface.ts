interface LocationOffre {
  ville: string;
  adresse: string;
}

interface Offre {
  titre: string;
  lieu_depart: LocationOffre;
  lieu_arrive: LocationOffre;
  heure_depart: Date;
  type: 'Co-Voiturage' | 'Livraison' | 'Taxi';
  vehicule?: string; // Assuming vehicule is a string representation of mongoose.Schema.Types.ObjectId
}
