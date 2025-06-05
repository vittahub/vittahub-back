import { IPatientRepository } from "./IPatientRepository";
import { Knex } from "knex";
import { Patient } from "../PatientModel";
import { UserBoundRepository } from "../../../shared/repositories/UserBoundRepository";

export class PatientRepository extends UserBoundRepository<Patient> implements IPatientRepository{
    constructor(db: Knex){
        super(db, 'patients');
    }

    async findByUserId(user_id: number): Promise<Patient | null> {
        const row  = await this.db(this.table).where({user_id}).first();
        return row ?? null;
    }
}