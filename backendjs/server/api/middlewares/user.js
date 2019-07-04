import { Request, Response, NextFunction } from 'express';
const Model = require('../../../sequelize/models');
const User = Model.User;

const prefix = 'https://api.limber.co/';

// Adds a user object for an authenticated user to req.user
// The authenticate middleware must be called prior
export default function decodeUser(req, res) {
  const name = req.user[prefix + 'name'];
  const profile = req.user[prefix + 'picture'];
  const email = req.user[prefix + 'email'];
  req.user_obj = User.findOrCreate({
    where: {sub: req.user.sub},
    defaults: {
        name,
        profile,
        email,
        sub: req.user.sub
    }
  });
}
