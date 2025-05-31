import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { Role } from "../../shared/types/Enums";
import { User } from "../auth/UserModel";
import toClinicRegisterResponse from './middleware/ClinicRegisterMapper';
import toSpecialistRegisterResponse from '../specialist/middleware/SpecialistRegisterMapper';
import toEmployeeRegisterResponse from '../employee/middleware/EmployeeRegisterMapper';
import { EmployeeRegisterRequest } from '../employee/dto/ClinicRequests';
import { EmployeeRegisterResponse } from '../employee/dto/ClinicResponses';
import { SpecialistRegisterRequest } from '../specialist/dto/SpecialistsRequests';
import { SpecialistRegisterResponse } from '../specialist/dto/SpecialistsResponses';
import { ClinicRegisterRequest } from './dto/ClinicRequests';
import { ClinicRegisterResponse } from './dto/ClinicResponse';
import { IUserRepository } from '../auth/repositories/IUserRepository';
import { IEmployeeRepository } from '../employee/repositories/IEmployeeRepository';
import { ISpecialistRepository } from '../specialist/repositories/ISpecialistRepository';
import { IClinicRepository } from './repositories/IClinicRepository';

export class ClinicController{
    constructor(
        private userRepository: IUserRepository,
        private clinicRepository: IClinicRepository,
        private specialistRepository: ISpecialistRepository,
        private employeeRepository: IEmployeeRepository
    ){}

    private async createUser(email: string, password: string, role: Role): Promise <User| null> {
        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) return null;

        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.create({
            email,
            password: hashedPassword,
            role
        });
    }

    registerClinic = async (
        req: Request<{}, {}, ClinicRegisterRequest>,
        res: Response<ClinicRegisterResponse>
    ) => {
        const req_body: ClinicRegisterRequest = req.body;

        const user = await this.createUser(req_body.email, req_body.password, req_body.role);
        if (!user) return res.status(400).json({ error: 'User already exists' });
    
        
        const clinic = await this.clinicRepository.create({
            user_id: user.id,
            name: req_body.name,
            cnpj: req_body.cnpj,
            address: req_body.address,
            phone: req_body.phone,
            whatsapp: req_body.whatsapp ?? null,
        })

        if(!clinic){
            await this.userRepository.delete(user.id)
            return res.status(500).json({ error: 'Occured a error during user creation'});
        }

        const clinicRegisterReponse = toClinicRegisterResponse(user, clinic);
        return res.status(201).json(clinicRegisterReponse)
    }

    registerSpecialist = async (
        req: Request<{}, {}, SpecialistRegisterRequest>,
        res: Response<SpecialistRegisterResponse>
    ) => {
        const req_body: SpecialistRegisterRequest = req.body;

        const user = await this.createUser(req_body.email, req_body.password, req_body.role);
        if (!user) return res.status(400).json({ error: 'User already exists' });

        const specialist = await this.specialistRepository.create({
            user_id: user.id,
            name: req_body.name,
            clinic_id: req_body.clinic_id,
            speciality: req_body.speciality,
            phone: req_body.phone
        });

        if(!specialist){
            await this.userRepository.delete(user.id);
            return res.status(500).json({ error: 'Occured a error during user creation'});
        }

        const specialistRegisterResponse = toSpecialistRegisterResponse(user, specialist);
        return res.status(201).json(specialistRegisterResponse)
    }

    registerEmployee = async (
        req: Request<{}, {}, EmployeeRegisterRequest>,
        res: Response<EmployeeRegisterResponse>
    ) => {
        const req_body: EmployeeRegisterRequest = req.body;

        const user = await this.createUser(req_body.email, req_body.password, req_body.role);
        if (!user) return res.status(400).json({ error: 'User already exists' });

        const employee = await this.employeeRepository.create({
            user_id: user.id,
            clinic_id: req_body.clinic_id,
            name: req_body.name,
            function: req_body.function,
            phone: req_body.phone
        });

        if(!employee){
            await this.userRepository.delete(user.id);
            return res.status(500).json({ error: 'Occured a error during user creation'});
        }

        const employeeRegisterResponse = toEmployeeRegisterResponse(user, employee);
        return res.status(201).json(employeeRegisterResponse)
    }
}