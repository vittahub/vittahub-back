import { Router, Response } from 'express';
import { ClinicController } from 'src/controllers/ClinicController';
import db from 'src/database/connection';
import { asyncHandler } from 'src/helpers/asyncHandler';
import { validate } from 'src/middleware/validate';
import { SpecialistRegisterSchema } from 'src/middleware/validationSchemes/authDTO/SpecialistRegister';
import { ClinicRepository } from 'src/repositories/ClinicRepository';
import { SpecialistRepository } from 'src/repositories/SpecialistRepository';
import { UserRepository } from 'src/repositories/UserRepository';

const clinicRoutes = Router()
const userRepository = new UserRepository(db);
const clinicController = new ClinicController(userRepository,
                                              new ClinicRepository(db),
                                              new SpecialistRepository(db))

clinicRoutes.post('specialists',
                  validate(SpecialistRegisterSchema),
                  asyncHandler(clinicController.registerSpecialist));

export default clinicRoutes
