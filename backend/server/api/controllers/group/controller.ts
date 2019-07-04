import { Request, Response } from 'express';
const Model = require('../../../sequelize/models');
const Group = Model.Group;

export class Controller {
  group(req: any, res: Response): void {
    const { name, description, tags } = req.body;
      let group = Group.create({
        name,
        description,
        tags,
        owner: req.user.sub
      });
  }
}
export default new Controller();
