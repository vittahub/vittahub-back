import { User } from "src/models/user";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}