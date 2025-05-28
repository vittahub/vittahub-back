import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { User } from "../UserModel";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}