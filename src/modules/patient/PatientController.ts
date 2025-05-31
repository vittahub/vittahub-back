import { Request, Response } from 'express';

import toPatientRegisterResponse from './middleware/PatientRegisterMapper';
import { PatientRegisterRequest } from './dto/PatientRequests';
import { PatientRegisterResponse } from './dto/PatientResponses';
import { IPatientRepository } from './repositories/IPatientRepository';
import { UserService } from 'src/shared/services/EntityCreation';

export class PatientController {
  constructor(
    private userServices: UserService,
    private patientsRepository: IPatientRepository     
  ){}

  registerPatient = async (
    req: Request<{}, {}, PatientRegisterRequest>,
    res: Response<PatientRegisterResponse>
  ) => {
    this.userServices.CreateWithUser(
        req.body.email,
        req.body.password,
        req.body.role,
        (userId) => this.patientsRepository.create({
          user_id: userId,
          name: req.body.name,
          birthdate: req.body.birthdate,
          sex: req.body.sex,
          address: req.body.address,
          phone_1: req.body.phone_1,
          phone_2: req.body.phone_2 ?? null,
          cpf: req.body.cpf
        }),
        toPatientRegisterResponse,
        res
    );
  };
}