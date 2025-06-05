import { Knex } from 'knex';

export interface IBaseRepository<T> {
    create(data: Omit<T, 'id'>, trx?: Knex.Transaction): Promise<T>;
    find(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: number, data: Partial<Omit<T, 'id'>>, trx?: Knex.Transaction): Promise<T>;
    delete(id: number): Promise<boolean>;
}