export interface Reservation{
  message : string,
  places : number ,
  status: 'acceptée' | 'refusé' | 'en attente' ,
  user :string
  offre : string
}



export enum ReservationStatus {
  ACCPETER="acceptée" ,
  REFUSED ="refusé" ,
  ATTENTE='en attente'
}
