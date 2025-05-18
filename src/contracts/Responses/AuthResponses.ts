import { User } from "../../models/User";
import { ErrorResponse } from "../ErrorResponse";

export interface UserResponse {
    id: number;
    name: string;
    email: string
};

export const toUserResponse = (user: User): UserResponse => ({
    id: user.id,
    name: user.name,
    email:user.email
});

export interface LoginSuccessResponse {
    user: UserResponse;
    token: string;
}

interface registerSuccessResponse {
    user: UserResponse;
}

export type RegisterResponse = registerSuccessResponse | ErrorResponse;
export type LoginResponse = LoginSuccessResponse | ErrorResponse;

