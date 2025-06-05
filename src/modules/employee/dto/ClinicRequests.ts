import { Role } from "../../../shared/types/Enums";

export interface EmployeeRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  clinic_id: number
  role: Role
  function: string;
  phone: string;
}