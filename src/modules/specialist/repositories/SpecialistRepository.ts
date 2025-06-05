import { Knex } from "knex";
import { Specialist } from "../specialist";
import { ISpecialistRepository } from "./ISpecialistRepository";
import { UserBoundRepository } from "src/shared/repositories/UserBoundRepository";

export class SpecialistRepository extends UserBoundRepository<Specialist> implements ISpecialistRepository{
    constructor(db: Knex){
        super(db, 'specialists')
    }
}