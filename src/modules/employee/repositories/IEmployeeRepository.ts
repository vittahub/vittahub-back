import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { Employee } from "../../employee/EmployeeModel";

export interface IEmployeeRepository extends IBaseRepository<Employee>{}