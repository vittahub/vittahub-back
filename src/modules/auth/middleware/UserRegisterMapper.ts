import { UserResponse } from "../dto/AuthResponse";
import { User } from "../UserModel";

export const toUserResponse = (user: User): UserResponse => ({
    id: user.id,
    email:user.email
});