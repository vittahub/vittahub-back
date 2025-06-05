import { Request, Response } from 'express';

import toClinicRegisterResponse from './middleware/ClinicRegisterMapper';
import toSpecialistRegisterResponse from '../specialist/middleware/SpecialistRegisterMapper';
import toEmployeeRegisterResponse from '../employee/middleware/EmployeeRegisterMapper';
import { EmployeeRegisterRequest } from '../employee/dto/ClinicRequests';
import { EmployeeRegisterResponse } from '../employee/dto/ClinicResponses';
import { SpecialistRegisterRequest } from '../specialist/dto/SpecialistsRequests';
import { SpecialistRegisterResponse } from '../specialist/dto/SpecialistsResponses';
import { ClinicRegisterRequest } from './dto/ClinicRequests';
import { ClinicRegisterResponse } from './dto/ClinicResponse';
import { IEmployeeRepository } from '../employee/repositories/IEmployeeRepository';
import { ISpecialistRepository } from '../specialist/repositories/ISpecialistRepository';
import { IClinicRepository } from './repositories/IClinicRepository';
import { UserService } from '../../shared/services/EntityCreation';
import { ClinicUpdateRequest } from './dto/ClinicUpdateRequest';
import { ClinicUpdateResponse } from './dto/ClinicUpdateResponse';
import { number } from 'zod';

export class ClinicController{
    constructor(
        private userServices: UserService,
        private clinicRepository: IClinicRepository,
        private specialistRepository: ISpecialistRepository,
        private employeeRepository: IEmployeeRepository
    ){}

    registerClinic = async (
        req: Request<{}, {}, ClinicRegisterRequest>,
        res: Response<ClinicRegisterResponse>
    ) => {
        await this.userServices.CreateWithUser(
            req.body.email,
            req.body.password,
            req.body.role,
            (userId) => this.clinicRepository.create({
                user_id: userId,
                name: req.body.name,
                cnpj: req.body.cnpj,
                address: req.body.address,
                phone: req.body.phone,
                whatsapp: req.body.whatsapp ?? null,
            }),
            toClinicRegisterResponse,
            res
        );
    }

    updateClinic = async(
        req: Request<{id: number}, {}, ClinicUpdateRequest>,
        res: Response<ClinicUpdateResponse>
    ) => {
        const userId = Number(req.params.id);

        await this.userServices.UpdateWithUser(
            userId,
            {email: req.body.email, password: req.body.password},
            async (userId, trx) => {
                const clinic = await this.clinicRepository.findByUserId(userId);
                if(!clinic) return null;

                return this.clinicRepository.update(clinic.id, {
                    name: req.body.email,
                    address: req.body.address,
                    phone: req.body.phone,
                    whatsapp: req.body.whatsapp
                }, trx);
            },
            (user, clinic) => toClinicRegisterResponse(user, clinic),
            res
        );
    }

    registerSpecialist = async (
        req: Request<{}, {}, SpecialistRegisterRequest>,
        res: Response<SpecialistRegisterResponse>
    ) => {
        this.userServices.CreateWithUser(
            req.body.email,
            req.body.password,
            req.body.role,
            (userId) => this.specialistRepository.create({
                user_id: userId,
                name: req.body.name,
                clinic_id: req.body.clinic_id,
                speciality: req.body.speciality,
                phone: req.body.phone
            }),
            toSpecialistRegisterResponse,
            res
        );
    }

    registerEmployee = async (
        req: Request<{}, {}, EmployeeRegisterRequest>,
        res: Response<EmployeeRegisterResponse>
    ) => {
        this.userServices.CreateWithUser(
            req.body.email,
            req.body.password,
            req.body.role,
            (userId) => this.employeeRepository.create({
                user_id: userId,
                clinic_id: req.body.clinic_id,
                name: req.body.name,
                function: req.body.function,
                phone: req.body.phone   
            }),
            toEmployeeRegisterResponse,
            res
        );
    }
}