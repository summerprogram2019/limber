import { Request, Response } from 'express';
import Group from '../../../sequelize/models/group.js';

export class Controller {
  group(req: Request, res: Response): void {
    const { name, description, tags } = req.body;
    Group.create({
      name,
      description,
      tags
    })
  }
}
export default new Controller();
