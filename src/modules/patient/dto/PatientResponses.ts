import { ErrorResponse } from "../../../shared/errors/ErrorResponse";
import { Address } from "../../../shared/types/address";
import { Role, Sex } from "../../../shared/types/Enums";

interface PatientRegisterSucessResponse {
    id: number,
    name: string,
    email: string,
    role: Role,
    birthdate: string,
    sex: Sex,
    address: Address,
    phone_1: string,
    phone_2: string | null,
    cpf: string
}

export type PatientRegisterResponse = PatientRegisterSucessResponse | ErrorResponse;