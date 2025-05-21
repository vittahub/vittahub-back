import { BaseRepository } from "./BaseRepository";
import { IPatientRepository } from "src/contracts/Repositories/IPatientRepository";
import { Knex } from "knex";
import { Patient } from "src/models/patient";

export class PatientRepository extends BaseRepository<Patient> implements IPatientRepository{
    constructor(db: Knex){
        super(db, 'patients');
    }
}