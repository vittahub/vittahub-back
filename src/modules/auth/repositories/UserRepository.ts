import { Knex } from "knex";
import { User } from "../UserModel";
import { BaseRepository } from "../../../shared/repositories/BaseRepository";
import { IUserRepository } from "./IUserRepository";

export class UserRepository extends BaseRepository<User> implements IUserRepository{
    constructor(db: Knex){
        super(db, 'users');
    }

    async findByEmail(email: string, trx?: Knex.Transaction): Promise<User | null> {
        const query = trx ?? this.db 
        const patient = await query(this.table).where({email}).first();
        return patient ?? null;
    }
}