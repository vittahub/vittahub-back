import { Address } from "../../shared/types/address";

export type Clinic = {
    id: number;
    user_id: number;
    name: string;
    cnpj: string;
    address: Address;
    phone: string;
    whatsapp: string | null; 
}