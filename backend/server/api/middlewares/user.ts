import { Request, Response, NextFunction } from 'express';
import User from '../../../sequelize/models/user.js';

// Adds a user object for an authenticated user to req.user
// The authenticate middleware must be called prior
export default function decodeUser(req: Request, res: Response) {
  const { name, profile } = req.body.user;
  req.user_obj = User.findOrCreate({
    where: {sub: req.user.sub},
    defaults: {
        name,
        profile,
        sub: req.user.sub
    }
  });
}
