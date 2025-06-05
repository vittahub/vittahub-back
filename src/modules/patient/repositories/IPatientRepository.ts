import { Patient } from "../PatientModel";
import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";

export interface IPatientRepository extends IBaseRepository<Patient>{
    
}