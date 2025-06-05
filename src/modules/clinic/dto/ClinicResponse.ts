import { ErrorResponse } from "../../../shared/errors/ErrorResponse";
import { Address } from "../../../shared/types/address";
import { Role } from "../../../shared/types/Enums";

interface ClinicRegisterSuccessResponse {
    id: number,
    name: string,
    email: string,
    role: Role,
    cnpj: string,
    address: Address,
    phone: string, 
    whatsapp: string | null,
}


export type ClinicRegisterResponse = ClinicRegisterSuccessResponse | ErrorResponse;