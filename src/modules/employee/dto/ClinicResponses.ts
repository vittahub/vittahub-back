import { ErrorResponse } from "../../../shared/errors/ErrorResponse";
import { Role } from "../../../shared/types/Enums";

interface EmployeeRegisterSuccessResponse {
    id:number,
    clinic_id: number,
    name: string,
    email: string,
    role: Role,
    function: string,
    phone: string,
}

export type EmployeeRegisterResponse = EmployeeRegisterSuccessResponse | ErrorResponse;