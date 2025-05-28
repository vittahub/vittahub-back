import { ErrorResponse } from "../../../shared/errors/ErrorResponse";
import { Role } from "../../../shared/types/Enums";

interface SpecialistRegisterSuccessResponse {
    id: number,
    clinic_id: number,
    name: string,
    email: string,
    role: Role,
    speciality: string,
    phone: string,
}

export type SpecialistRegisterResponse = SpecialistRegisterSuccessResponse | ErrorResponse;