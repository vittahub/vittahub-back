import { Specialist } from "../../specialist/specialist";
import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";

export interface ISpecialistRepository extends IBaseRepository<Specialist>{
    findByUserId(id: number): Promise<Specialist | null>
}