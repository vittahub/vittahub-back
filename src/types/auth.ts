import { Request } from "express";

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface AuthenticationRequest extends Request {
  userId?: string;
}
