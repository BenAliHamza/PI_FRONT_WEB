// user.model.ts

export interface User {
  _id?:string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: number;
  image?: string;
  role?: string;
  status?: string;
  ville: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/   ;
export  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;

export  const PHONE_REGEX =/^\d{8}$/
export  const STATUS_REGEX = /^(PENDING|APPROVED|REJECTED|BANNED)$/ ;
export  const ROLE_REGEX = /^(DEFAULT|ADMIN|TAXI)$/
