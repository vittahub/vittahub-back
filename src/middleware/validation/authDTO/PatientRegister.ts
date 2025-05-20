import { z } from 'zod';
import { PatientRegisterRequest } from '../../../contracts/Requests/AuthRequests'
import isValidCPF from '../../../helpers/cpfValidation';

export const PatientRegisterSchema: z.ZodType<PatientRegisterRequest> = z.object({
    name: z.string().min(2, "name too short").max(100, "name too long"),
    email: z.string().min(5, "email too short").max(255, "email too long").email(),
    password: z.string().min(6, "password too short"),
    password_confirmation: z.string(),
    birthdate: z.string(),
    sex: z.enum(["male", "female", "other"]),
    address: z.object({
        street: z.string(),
        number: z.string(),
        country: z.string(),
        city: z.string(),
        zip_code: z.string(),
    }),
    phone_1: z.string(),
    phone_2: z.string().optional(),
    cpf: z.string().refine(isValidCPF, {
        message: "invalid cpf format",
    }),
}).refine((data) => data.password == data.password_confirmation, {
    message: "diferent password given for confirmation",
    path: ["password_confirmation"],
});