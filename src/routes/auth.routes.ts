import { Router, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import authMiddleware from '../middleware/authMiddleware';
import { AuthenticationRequest } from '../types/auth';
import { asyncHandler } from '../helpers/asyncHandler';
import { UserRepository } from '../repositories/UserRepository';
import db from '../database/connection';

const authRoutes = Router();
const authController = new AuthController(new UserRepository(db))

authRoutes.post('/register', asyncHandler(authController.register));

authRoutes.post('/login', asyncHandler(authController.login));

authRoutes.get(
  '/private', authMiddleware,
  asyncHandler((req: AuthenticationRequest, res:Response) => {
    console.log(req.userId)
    return res.json({ message: `Hello User ${req.userId}` });
  })
);

export default authRoutes