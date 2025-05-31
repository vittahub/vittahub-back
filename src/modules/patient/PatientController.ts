import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { PatientRepository } from './repositories/PatientRepository';
import toPatientRegisterResponse from './middleware/PatientRegisterMapper';
import { PatientRegisterRequest } from './dto/PatientRequests';
import { PatientRegisterResponse } from './dto/PatientResponses';
import { IUserRepository } from '../auth/repositories/IUserRepository';
import { IPatientRepository } from './repositories/IPatientRepository';

export class PatientController {
  constructor(
    private userRepository: IUserRepository,
    private patientsRepository: IPatientRepository     
  ){}

  registerPatient = async (
    req: Request<{}, {}, PatientRegisterRequest>,
    res: Response<PatientRegisterResponse>
  ) => {
    const req_body: PatientRegisterRequest = req.body;

    const userExists = await this.userRepository.findByEmail(req_body.email);
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(req_body.password, 10);
    const user = await this.userRepository.create({
      email:req_body.email,
      password: hashedPassword,
      role:req_body.role});

    const patient = await this.patientsRepository.create({
      user_id: user.id,
      name: req_body.name,
      birthdate: req_body.birthdate,
      sex: req_body.sex,
      address: req_body.address,
      phone_1: req_body.phone_1,
      phone_2: req_body.phone_2 ?? null,
      cpf: req_body.cpf
    })

    if(!user || !patient){
      await this.userRepository.delete(user.id);
      return res.status(500).json({ error: 'Occured a error during user creation'});
    }

    const patientRegisterResponse = toPatientRegisterResponse(user, patient);
    return res.status(201).json(patientRegisterResponse);
  };
}