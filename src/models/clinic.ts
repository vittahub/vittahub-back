import { Address } from "../types/address";

export type Clinic = {
    user_id: number;
    name: string;
    cnpj: string;
    address: Address;
    phone: string;
    whatsapp: string | null; 
}