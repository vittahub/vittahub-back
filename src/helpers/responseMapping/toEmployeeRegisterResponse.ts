import { EmployeeRegisterResponse } from "../../contracts/Responses/AuthResponses";
import { employee } from "../../models/employee";
import { User } from "../../models/user";

export default function toEmployeeRegisterResponse
(user_data: User, employee_data: employee): EmployeeRegisterResponse{
    return {
        id: user_data.id,
        clinic_id: employee_data.clinic_id,
        name: employee_data.name,
        email: user_data.email,
        role: user_data.role,
        function: employee_data.function,
        phone: employee_data.phone
    }
}