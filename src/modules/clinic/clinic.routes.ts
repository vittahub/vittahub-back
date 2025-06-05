import { Router } from 'express';
import { UserRepository } from '../auth/repositories/UserRepository';
import db from '../../database/connection';
import { asyncHandler } from '../../shared/helpers/asyncHandler';
import { validate } from '../../shared/middleware/validate';
import { EmployeeRegisterSchema } from '../employee/validators/employee.schema';
import { SpecialistRegisterSchema } from '../specialist/validators/specialist.schema';
import { ClinicController } from './ClinicController';
import { ClinicRepository } from './repositories/ClinicRepository';
import { EmployeeRepository } from '../employee/repositories/EmployeeRepository';
import { SpecialistRepository } from '../specialist/repositories/SpecialistRepository';
import { ClinicRegisterSchema } from './validators/clinic.scheme';
import { UserService } from '../../shared/services/EntityCreation';
import { ClinicUpdateSchema } from './validators/clinicUpdate.scheme';

const clinicRoutes = Router()
const clinicController = new ClinicController(new UserService(new UserRepository(db)),
                                              new ClinicRepository(db),
                                              new SpecialistRepository(db),
                                              new EmployeeRepository(db))

clinicRoutes.post('/register',
                validate(ClinicRegisterSchema),
                asyncHandler(clinicController.registerClinic));
                
clinicRoutes.put('/update/:id',
                validate(ClinicUpdateSchema),
                asyncHandler(clinicController.updateClinic))

clinicRoutes.post('/specialists',
                  validate(SpecialistRegisterSchema),
                  asyncHandler(clinicController.registerSpecialist));

clinicRoutes.post('/employees', 
                  validate(EmployeeRegisterSchema),
                  asyncHandler(clinicController.registerEmployee))

export default clinicRoutes
