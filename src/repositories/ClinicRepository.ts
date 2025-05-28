import { Clinic } from "../models/clinic";
import { BaseRepository } from "./BaseRepository";
import { IClinicRepository } from "../contracts/Repositories/IClinicRepository";
import { Knex } from "knex";

export class ClinicRepository extends BaseRepository<Clinic> implements IClinicRepository {
    constructor (db: Knex){
        super(db, 'clinics');
    }
}