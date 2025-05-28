import { Router } from 'express';
import { ClinicController } from '../controllers/ClinicController';
import db from '../database/connection';
import { asyncHandler } from '../helpers/asyncHandler';
import { validate } from '../middleware/validate';
import { SpecialistRegisterSchema } from '../middleware/validationSchemes/authDTO/SpecialistRegister';
import { ClinicRepository } from '../repositories/ClinicRepository';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { UserRepository } from '../repositories/UserRepository';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { EmployeeRegisterSchema } from '../middleware/validationSchemes/authDTO/EmployeeRegister';

const clinicRoutes = Router()
const userRepository = new UserRepository(db);
const clinicController = new ClinicController(userRepository,
                                              new ClinicRepository(db),
                                              new SpecialistRepository(db),
                                              new EmployeeRepository(db))

clinicRoutes.post('/specialists',
                  validate(SpecialistRegisterSchema),
                  asyncHandler(clinicController.registerSpecialist));

clinicRoutes.post('/employees', 
                  validate(EmployeeRegisterSchema),
                  asyncHandler(clinicController.registerEmployee))

export default clinicRoutes
