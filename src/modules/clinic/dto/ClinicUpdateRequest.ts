export interface ClinicUpdateRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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