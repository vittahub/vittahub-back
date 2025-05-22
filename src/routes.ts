import { Router } from 'express';
import authRoutes from './routes/auth.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send({
    message: "Welcome to VittaHub's API",
    repositoryUrl: "https://github.com/vittahub/vittahub-back.git",
    documentation: {}
  });
});

router.use('/auth', authRoutes)

export default router;
