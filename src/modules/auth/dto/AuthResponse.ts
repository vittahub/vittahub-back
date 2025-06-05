import { ErrorResponse } from "../../../shared/errors/ErrorResponse";

export interface UserResponse {
    id: number;
    email: string
};

export interface LoginSuccessResponse {
    user: UserResponse;
    token: string;
}

export type LoginResponse = LoginSuccessResponse | ErrorResponse;