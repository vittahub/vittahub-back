import { z } from 'zod';
import { EmployeeRegisterRequest } from '../../../contracts/Requests/AuthRequests'

export const EmployeeRegisterSchema: z.ZodType<EmployeeRegisterRequest> = z.object({
    name: z.string().min(2, "name too short").max(100, "name too long"),
    email: z.string().min(5, "email too short").max(255, "email too long").email(),
    password: z.string().min(6, "password too short"),
    password_confirmation: z.string(),
    role: z.enum(["patient", "clinic", "specialist", "employee"]),
    function: z.string(),
    phone: z.string()
}).refine((data) => data.password == data.password_confirmation, {
    message: "diferent password given for confirmation",
    path: ["password_confirmation"],
});