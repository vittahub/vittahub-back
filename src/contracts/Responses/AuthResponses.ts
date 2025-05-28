import { Role, Sex } from "../../types/Enums";
import { User } from "../../models/user";
import { ErrorResponse } from "../ErrorResponse";
import { Address } from "../../types/address";

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

export interface UserResponse {
    id: number;
    email: string
};

export const toUserResponse = (user: User): UserResponse => ({
    id: user.id,
    email:user.email
});

export interface LoginSuccessResponse {
    user: UserResponse;
    token: string;
}

export type PatientRegisterResponse = PatientRegisterSucessResponse | ErrorResponse;
export type ClinicRegisterResponse = ClinicRegisterSuccessResponse | ErrorResponse;
export type LoginResponse = LoginSuccessResponse | ErrorResponse;

