import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { Clinic } from "../ClinicModel";

export interface IClinicRepository extends IBaseRepository<Clinic>{
    findByUserId(id: number): Promise<Clinic | null>
}