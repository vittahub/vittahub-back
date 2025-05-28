import { ClinicRegisterRequest} from "../../src/contracts/Requests/AuthRequests";
import { ClinicRepository } from "../../src/repositories/ClinicRepository";
import { UserRepository } from "../../src/repositories/UserRepository";
import { Request, Response } from "express";
import { ClinicRegisterResponse } from "../../src/contracts/Responses/AuthResponses";
import bcrypt from 'bcryptjs';
import toClinicRegisterResponse from "../../src/helpers/responseMapping/toClinicRegisterResponse";

export class ClinicController{
    constructor(
        private userRepository: UserRepository,
        private clinicRepository: ClinicRepository 
    ){}

    registerClinic = async (
        req: Request<{}, {}, ClinicRegisterRequest>,
        res: Response<ClinicRegisterResponse>
    ) => {
        const req_body: ClinicRegisterRequest = req.body;

        const userExists = await this.userRepository.findByEmail(req_body.email);
        if (userExists) return res.status(400).json({ error: 'User already exists' });
    
        const hashedPassword = await bcrypt.hash(req_body.password, 10);
        const user = await this.userRepository.create({
            email:req_body.email,
            password: hashedPassword,
            role:req_body.role});
        
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
}