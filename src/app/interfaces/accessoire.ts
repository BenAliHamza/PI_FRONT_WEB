export interface Accessoire {
    _id: string; // Assuming _id is the ID field in your MongoDB document
    expediteur: string; // User ID of the sender
    description: string;
    titre: string;
    prix: number;
    etat: 'Vendue' | 'Disponible';
    categorie: string; // Category ID
    image: string; // URL or file path of the image
  }