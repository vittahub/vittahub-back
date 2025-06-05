import { Employee } from "../EmployeeModel";
import { BaseRepository } from "../../../shared/repositories/BaseRepository";
import { Knex } from "knex";
import { IEmployeeRepository } from "./IEmployeeRepository";

export class EmployeeRepository extends BaseRepository<Employee> implements IEmployeeRepository{
    constructor(db: Knex){
        super(db, 'employees')
    }
}