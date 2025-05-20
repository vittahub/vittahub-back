export interface LoginRequest {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface PatientRegisterRequest {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  sex: 'male' | 'female' | 'other';
  //address
  phone_1:string;
  phone_2?:string;
  cpf:string;
}

export interface ClinicRegisterRequest {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  //address
  phone: string;
  whatsapp?: string;
}

export interface SpecialistRegisterRequest {
  name: string;
  email: string;
  password: string;
  speciality: string;
  phone: string;
}

export interface EmployeeRegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}