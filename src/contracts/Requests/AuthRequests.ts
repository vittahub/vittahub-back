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