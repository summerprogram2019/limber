import { Request, Response } from 'express';
const Model = require('../../../sequelize/models');
const Group = Model.Group;

export class Controller {
  group(req, res) {
    const { name, description, tags } = req.body;
    if (typeof req.body.id === "undefined") {
      let group = Group.create({
        name,
        description,
        tags,
        owner: req.user.sub
      });
    }
    else {
      // TODO check privileges of user
      const id = req.body.id;
      let group = Group.findById(id);
      group.name = name;
      group.description = description;
      group.tags = tags;
    }
  }
}
export default new Controller();
