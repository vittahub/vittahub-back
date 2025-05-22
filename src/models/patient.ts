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
  const parsed = new Date(birthdate);

  if (isNaN(parsed.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - parsed.getFullYear();

  const monthDiff = today.getMonth() - parsed.getMonth();
  const dayDiff = today.getDate() - parsed.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
}