import { Router, Response } from 'express';
import db from '../../database/connection';
import { AuthenticationRequest } from './types/auth';
import { asyncHandler } from '../../shared/helpers/asyncHandler';
import authMiddleware from './middleware/AuthMiddleware';
import { UserRepository } from './repositories/UserRepository';
import { AuthController } from './AuthController';

const userRepository = new UserRepository(db);

const authRoutes = Router();
const authController = new AuthController(userRepository)

authRoutes.post('/login', asyncHandler(authController.login));

authRoutes.get(
  '/private', authMiddleware,
  asyncHandler((req: AuthenticationRequest, res:Response) => {
    console.log(req.userId)
    return res.json({ message: `Hello User ${req.userId}` });
  })
);

export default authRoutes