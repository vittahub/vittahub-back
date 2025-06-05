import bcrypt from 'bcryptjs';
import { Response } from 'express';

import { IUserRepository } from "../../modules/auth/repositories/IUserRepository";
import { Role } from "../types/Enums";
import { User } from "../../modules/auth/UserModel";
import db from '../../database/connection';
import { Knex } from 'knex';

export class UserService {
    constructor(public userRepository: IUserRepository) {}

    async __createUser(
        email: string,
        password: string,
        role: Role,
        trx: Knex.Transaction
    ): Promise <User| null> {
        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) return null;

        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.create({
            email,
            password: hashedPassword,
            role
        }, trx);
    }

    async CreateWithUser<T>(
        email: string,
        password: string,
        role: Role,
        createEntity: (userId: number, trx: Knex.Transaction) => Promise<T | null>,
        onSuccess: (user: User, entity: T) => unknown,
        res: Response
    ){
        await db.transaction(async (trx) => {
            const user = await this.__createUser(email, password, role, trx);
            if (!user) return res.status(400).json({ error: 'User already exists' });

            const entity = await createEntity(user.id, trx);
            if(!entity) {
                return res.status(500).json({ error: 'Entity creation failed' });
            }
            return res.status(201).json(onSuccess(user, entity));            
        });

    }

    async UpdateWithUser<T>(
        userId: number,
        userUpdate: Partial<Omit<User, 'id'>>,
        entityUpdate: (userId: number, trx: Knex.Transaction) => Promise<T | null>,
        onSuccess: (user: User, entity: T) => unknown,
        res: Response
    ) {
        await db.transaction(async (trx) => {
            const user = await this.userRepository.update(userId, userUpdate, trx);
            if(!user) {
                return res.status(404).json({error: "user not found"});
            }

            const entity = await entityUpdate(userId, trx);
            if(!entity) {
                return res.status(500).json({error: "entity failed to update"});
            }

            return res.status(200).json(onSuccess(user, entity));
        });
    }
}