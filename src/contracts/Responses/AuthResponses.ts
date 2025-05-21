import { Role, Sex } from "src/types/Enums";
import { User } from "../../models/user";
import { ErrorResponse } from "../ErrorResponse";
import { Address } from "src/types/address";

interface PatientRegisterSucessResponse {
    id: number,
    name: string,
    email: string,
    role: Role,
    birthdate: Date,
    sex: Sex,
    address: Address,
    phone_1: string,
    phone_2: string | null,
    cpf: string
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
export type LoginResponse = LoginSuccessResponse | ErrorResponse;

