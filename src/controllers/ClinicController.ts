import { ClinicRegisterRequest, EmployeeRegisterRequest, SpecialistRegisterRequest} from "../../src/contracts/Requests/AuthRequests";
import { ClinicRepository } from "../../src/repositories/ClinicRepository";
import { UserRepository } from "../../src/repositories/UserRepository";
import { Request, Response } from "express";
import { ClinicRegisterResponse, EmployeeRegisterResponse, SpecialistRegisterResponse } from "../../src/contracts/Responses/AuthResponses";
import bcrypt from 'bcryptjs';
import toClinicRegisterResponse from "../../src/helpers/responseMapping/toClinicRegisterResponse";
import { SpecialistRepository } from "../repositories/SpecialistRepository";
import toSpecialistRegisterResponse from "../helpers/responseMapping/toSpecialistRegisterResponse";
import { User } from "../models/user";
import { Role } from "../types/Enums";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import toEmployeeRegisterResponse from "../helpers/responseMapping/toEmployeeRegisterResponse";



export class ClinicController{
    constructor(
        private userRepository: UserRepository,
        private clinicRepository: ClinicRepository,
        private specialistRepository: SpecialistRepository,
        private employeeRepository: EmployeeRepository
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

        if(!user || !clinic){
            this.userRepository.delete(user.id)
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

        if(!user || !specialist){
            this.userRepository.delete(user.id);
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

        if(!user || !employee){
            this.userRepository.delete(user.id);
            return res.status(500).json({ error: 'Occured a error during user creation'});
        }

        const employeeRegisterResponse = toEmployeeRegisterResponse(user, employee);
        return res.status(201).json(employeeRegisterResponse)
    }
}