import { employee } from "../../models/employee";
import { IBaseRepository } from "./IBaseRepository";

export interface IEmployeeRepository extends IBaseRepository<employee>{}