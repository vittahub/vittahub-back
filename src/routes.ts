import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import patientRoutes from './modules/patient/patient.routes';
import specialistRoutes from './modules/specialist/specialist.routes';
import employeeRoutes from './modules/employee/employee.routes';
import clinicRoutes from './modules/clinic/clinic.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send({
    message: "Welcome to VittaHub's API",
    repositoryUrl: "https://github.com/vittahub/vittahub-back.git",
    documentation: "https://github.com/vittahub/vittahub-back/blob/main/docs/api.md"
  });
});

router.use('/auth', authRoutes)
router.use('/clinic', clinicRoutes)
router.use('/patient', patientRoutes)
router.use('/specialist', specialistRoutes)
router.use('/employee', employeeRoutes)

export default router;
