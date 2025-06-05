import { IBaseRepository } from "./IBaseRepository";
import { Knex } from "knex";

export abstract class BaseRepository<T> implements IBaseRepository<T>{
    protected db: Knex;
    protected table: string;

    constructor(db: Knex, table: string) {
        this.db = db;
        this.table = table;
    }

    async create(data: Omit<T, "id">, trx?: Knex.Transaction): Promise<T> {
        const query =  trx ?? this.db
        const [row] = await query(this.table).insert(data)
                                             .returning("*")
        return row
    }

    async find(id: number): Promise<T | null> {
        const row  = await this.db(this.table).where({id}).first();
        return row ?? null;
    }

    async findAll(): Promise<T[]> {
        return this.db(this.table).select("*");
    }

    async update(id: number, data: Partial<Omit<T, "id">>, trx?: Knex.Transaction): Promise<T> {
        const query =  trx ?? this.db
        const [row] = await query(this.table).where({id})
                                             .update(data)
                                             .returning("*");
        return row;
    }
    async delete(id: number): Promise<boolean> {
        const deleted = await this.db(this.table).where({id})
                                                 .del();
        return deleted > 0;
    }
}