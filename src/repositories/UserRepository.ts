import { User } from "../models/User";
import { IUserReadRepository } from "../contracts/Repositories/User/IUserReadRepository";
import { IUserWriteRepository } from "../contracts/Repositories/User/IUserWriteRepository";
import { Knex } from "knex";

export class UserRepository implements IUserReadRepository, IUserWriteRepository{
    private db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    async create(user_data: Omit<User, 'id'>): Promise<User> {
        const [row] = await this.db('users').insert(user_data)
                                            .returning(['id', 'email', 'password'])
        
        return new User(row.id, row.email, row.password);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.db('users').where({ email }).first();
        return user ? new User(user.id, user.email, user.password) : null;
    }
}