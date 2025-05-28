import { specialist } from "src/models/specialist";
import { BaseRepository } from "./BaseRepository";
import { ISpecialistRepository } from "src/contracts/Repositories/ISpecialistRepository";
import { Knex } from "knex";

export class SpecialistRepository extends BaseRepository<specialist> implements ISpecialistRepository{
    constructor(db: Knex){
        super(db, 'specialists')
    }
}