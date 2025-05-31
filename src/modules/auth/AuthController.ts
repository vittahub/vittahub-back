import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { LoginRequest } from './dto/AuthRequests';
import { LoginResponse, UserResponse } from './dto/AuthResponse';
import { toUserResponse } from './middleware/UserRegisterMapper';
import { IUserRepository } from './repositories/IUserRepository';

export class AuthController {
  constructor(
    private userRepository: IUserRepository,
  ){}
  
  login = async (
    req: Request<{}, {}, LoginRequest>,
    res: Response<LoginResponse>
  ) => {
    const { email, password } = req.body;

    const user = await this.userRepository.findByEmail(email);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(400).json({ error: 'Invalid password' });

    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET) throw new Error("Missing JWT_SECRET in enviroment variable");


    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '1d',
    });
    
    const userResponse: UserResponse = toUserResponse(user)
    return res.json({ user: userResponse, token });
  };
}