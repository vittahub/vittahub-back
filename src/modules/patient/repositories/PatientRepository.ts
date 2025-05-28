import { BaseRepository } from "../../../shared/repositories/BaseRepository";
import { IPatientRepository } from "./IPatientRepository";
import { Knex } from "knex";
import { Patient } from "../PatientModel";

export class PatientRepository extends BaseRepository<Patient> implements IPatientRepository{
    constructor(db: Knex){
        super(db, 'patients');
    }
}