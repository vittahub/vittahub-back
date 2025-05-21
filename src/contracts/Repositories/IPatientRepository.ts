import { Patient } from "../../models/patient";
import { IBaseRepository } from "./IBaseRepository";

export interface IPatientRepository extends IBaseRepository<Patient>{
    
}