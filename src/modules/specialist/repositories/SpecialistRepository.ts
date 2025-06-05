import { Knex } from "knex";
import { BaseRepository } from "../../../shared/repositories/BaseRepository";
import { Specialist } from "../specialist";
import { ISpecialistRepository } from "./ISpecialistRepository";

export class SpecialistRepository extends BaseRepository<Specialist> implements ISpecialistRepository{
    constructor(db: Knex){
        super(db, 'specialists')
    }
}