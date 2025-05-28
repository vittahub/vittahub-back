import { Patient } from "../PatientModel";
import { User } from "../../auth/UserModel";
import { PatientRegisterResponse } from "../dto/PatientResponses";

export default function toPatientRegisterResponse
(user_data: User, patient_data: Patient): PatientRegisterResponse{
    return {
        id: user_data.id,
        name: patient_data.name,
        email: user_data.email,
        role: user_data.role,
        birthdate: patient_data.birthdate,
        sex: patient_data.sex,
        address: patient_data.address,
        phone_1: patient_data.phone_1,
        phone_2: patient_data.phone_2 ?? null,
        cpf: patient_data.cpf
    }
}