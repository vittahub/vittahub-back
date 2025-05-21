import { Address } from "../types/address";
import { Sex } from "../types/Enums";

export type Patient = {
  user_id: number;
  name: string;
  birthdate: string;
  sex: Sex;
  address: Address;
  phone_1: string;
  phone_2: string | null;
  cpf: string;
}

export function isAdult(birthdate: string): boolean {
  return new Date().getFullYear() - new Date(birthdate).getFullYear() >= 18;
}