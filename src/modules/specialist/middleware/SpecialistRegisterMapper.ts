import { User } from "../../auth/UserModel";
import { SpecialistRegisterResponse } from "../dto/SpecialistsResponses";
import { Specialist } from "../specialist";

export default function toSpecialistRegisterResponse
(user_data: User, specialist_data: Specialist): SpecialistRegisterResponse{
    return {
        id: user_data.id,
        clinic_id: specialist_data.clinic_id,
        name: specialist_data.name,
        email: user_data.email,
        role: user_data.role,
        speciality: specialist_data.speciality,
        phone: specialist_data.phone 
    }
}