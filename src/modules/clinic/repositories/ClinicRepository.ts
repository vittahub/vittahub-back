import { UserBoundRepository } from "../../../shared/repositories/UserBoundRepository";
import { Clinic } from "../ClinicModel";
import { IClinicRepository } from "./IClinicRepository";
import { Knex } from "knex";

export class ClinicRepository extends UserBoundRepository<Clinic> implements IClinicRepository {
    constructor (db: Knex){
        super(db, 'clinics');
    }
}