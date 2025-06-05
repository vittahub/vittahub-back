import { Employee } from "../EmployeeModel";
import { Knex } from "knex";
import { IEmployeeRepository } from "./IEmployeeRepository";
import { UserBoundRepository } from "src/shared/repositories/UserBoundRepository";

export class EmployeeRepository extends UserBoundRepository<Employee> implements IEmployeeRepository{
    constructor(db: Knex){
        super(db, 'employees')
    }
}