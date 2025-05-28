import { Response, NextFunction } from "express";
import { AuthenticationRequest, TokenPayload } from "../types/auth";
import jwt from "jsonwebtoken";

const AuthMiddleware = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader){
    res.status(401).json({ error: 'No token provided' });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET) throw new Error("")
      
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }
};

export default AuthMiddleware