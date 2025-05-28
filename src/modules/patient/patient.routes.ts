import { Router} from 'express';
import db from '../../database/connection';
import { UserRepository } from '../auth/repositories/UserRepository';
import { PatientController } from './PatientController';
import { PatientRepository } from './repositories/PatientRepository';
import { asyncHandler } from '../../shared/helpers/asyncHandler';
import { validate } from '../../shared/middleware/validate';
import { PatientRegisterSchema } from './validators/patient.schema';

const patientRoutes = Router();
const patientController = new PatientController(new UserRepository(db), new PatientRepository(db));

patientRoutes.post('/register',
              validate(PatientRegisterSchema),
              asyncHandler(patientController.registerPatient));

export default patientRoutes