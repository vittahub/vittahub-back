import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterRequest, LoginRequest } from '../contracts/Requests/AuthRequests'
import { UserResponse, LoginResponse, RegisterResponse, toUserResponse } from '../contracts/Responses/AuthResponses';
import { UserRepository } from '../repositories/UserRepository';

export class AuthController {
  constructor(private userRepository: UserRepository){}

  register = async (
    req: Request<{}, {}, RegisterRequest>,
    res: Response<RegisterResponse>
  ) => {
    const { name, email, password } = req.body;

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ name, email, password: hashedPassword });

    if(user == null) return res.status(500).json({ error: 'Occured a error during user creation'})
  
    const userResponse = toUserResponse(user);
    return res.status(201).json({user: userResponse});
  };

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