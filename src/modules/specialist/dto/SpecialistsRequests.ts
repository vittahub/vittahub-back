import { Role } from "../../../shared/types/Enums";

export interface SpecialistRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  clinic_id: number
  role: Role
  speciality: string;
  phone: string;
}