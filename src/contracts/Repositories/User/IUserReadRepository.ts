import { User } from "../../../models/User";

export interface IUserReadRepository {
    findByEmail(email: string): Promise<User | null>;
}