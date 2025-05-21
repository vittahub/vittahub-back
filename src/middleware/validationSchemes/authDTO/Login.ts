import { z } from 'zod';
import { LoginRequest } from '../../../contracts/Requests/AuthRequests'

export const LoginSchema: z.ZodType<LoginRequest> = z.object({
    email: z.string().email(),
    password: z.string()
});