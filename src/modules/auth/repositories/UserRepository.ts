import { Knex } from "knex";
import { User } from "../UserModel";
import { BaseRepository } from "../../../shared/repositories/BaseRepository";
import { IUserRepository } from "./IUserRepository";

export class UserRepository extends BaseRepository<User> implements IUserRepository{
    constructor(db: Knex){
        super(db, 'users');
    }

    async findByEmail(email: string): Promise<User | null> {
        const patient = await this.db(this.table).where({email}).first();
        return patient ?? null;
    }
}