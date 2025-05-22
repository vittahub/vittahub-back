import { Router, Response } from 'express';

import db from '../database/connection';
import { AuthenticationRequest } from '../types/auth';
import { asyncHandler } from '../helpers/asyncHandler';
import { AuthController } from '../controllers/AuthController';
import { PatientController } from '../controllers/PatientController';
import { validate } from '../middleware/validate';
import authMiddleware from '../middleware/authMiddleware';
import { PatientRegisterSchema } from '../middleware/validationSchemes/authDTO/PatientRegister';
import { UserRepository } from '../repositories/UserRepository';
import { PatientRepository } from '../repositories/PatientRepository';

const authRoutes = Router();
const authController = new AuthController(new UserRepository(db))
const patientController = new PatientController(new UserRepository(db), new PatientRepository(db))

authRoutes.post('/register/patient',
                validate(PatientRegisterSchema),
                asyncHandler(patientController.registerPatient));

authRoutes.post('/login', asyncHandler(authController.login));

authRoutes.get(
  '/private', authMiddleware,
  asyncHandler((req: AuthenticationRequest, res:Response) => {
    console.log(req.userId)
    return res.json({ message: `Hello User ${req.userId}` });
  })
);

export default authRoutes