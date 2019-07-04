import { Request, Response, NextFunction } from 'express';
const Model = require('../../../sequelize/models');
const User = Model.User;

// Adds a user object for an authenticated user to req.user
// The authenticate middleware must be called prior
export default function decodeUser(req: any, res: Response) {
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
