import * as Enums from '../../types/Enums';

export interface LoginRequest {
  email: string;
  password: string;
}

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

export interface ClinicRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: Enums.Role
  cnpj: string;
  address: {
    street: string;
    number: string;
    country: string;
    city: string;
    zip_code: string;
  }
  phone: string;
  whatsapp?: string;
}

export interface SpecialistRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  clinic_id: number
  role: Enums.Role
  speciality: string;
  phone: string;
}

export interface EmployeeRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: Enums.Role
  function: string;
  phone: string;
}