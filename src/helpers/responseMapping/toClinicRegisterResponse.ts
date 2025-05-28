import { ClinicRegisterResponse } from "src/contracts/Responses/AuthResponses";
import { Clinic } from "src/models/clinic";
import { User } from "src/models/user";

export default function toClinicRegisterResponse
(user_data: User, clinic_data: Clinic): ClinicRegisterResponse{
    return {
        id: user_data.id,
        name: clinic_data.name,
        email: user_data.email,
        role: user_data.role,
        cnpj: clinic_data.cnpj,
        address: clinic_data.address,
        phone: clinic_data.phone,
        whatsapp: clinic_data.whatsapp
    }
}