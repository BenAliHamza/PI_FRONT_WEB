export interface Reclamation {
    id?: string; // ID optionnel
    titre: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date; // updatedAt optionnel
    status: 'OPEN' | 'CLOSED';
    response?: string; // response optionnel
    user_Id: string; // ID de l'utilisateur
}
