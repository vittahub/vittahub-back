import { z } from "zod";
import { ClinicUpdateRequest } from "../dto/ClinicUpdateRequest";

export const ClinicUpdateSchema: z.ZodType<ClinicUpdateRequest> = z.object({
    name: z.string().min(2, "name too short").max(100, "name too long"),
    email: z.string().min(5, "email too short").max(255, "email too long").email(),
    password: z.string().min(6, "password too short"),
    password_confirmation: z.string(),
    address: z.object({
        street: z.string(),
        number: z.string(),
        country: z.string(),
        city: z.string(),
        zip_code: z.string(),
    }),
    phone: z.string(),
    whatsapp: z.string().optional(),
}).refine((data) => data.password == data.password_confirmation, {
    message: "diferent password given for confirmation",
    path: ["password_confirmation"],
});