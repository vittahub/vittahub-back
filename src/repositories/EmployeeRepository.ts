import { IEmployeeRepository } from "src/contracts/Repositories/IEmployeeRepository";
import { employee } from "../models/employee";
import { BaseRepository } from "./BaseRepository";
import { Knex } from "knex";

export class EmployeeRepository extends BaseRepository<employee> implements IEmployeeRepository{
    constructor(db: Knex){
        super(db, 'employees')
    }
}