// src/types/express.d.ts
import { Request } from 'express';
import { User } from '../identity/identity.models';

declare global {
  namespace Express {
    interface Request {
      user?: User;  
    }
  }
}