import { User } from "../../../models/User";

export interface IUserWriteRepository {
    create(user_data: User): Promise<User>;
}