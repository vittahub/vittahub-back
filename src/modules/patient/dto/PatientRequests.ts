import * as Enums from '../../../shared/types/Enums';

export interface PatientRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: Enums.Role;
  birthdate: string;
  sex: Enums.Sex;
  address: {
    street: string;
    number: string;
    country: string;
    city: string;
    zip_code: string;
  }
  phone_1:string;
  phone_2?:string;
  cpf:string;
}