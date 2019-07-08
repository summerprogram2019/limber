const Model = require('../../../sequelize/models');
const Group = Model.Group;

export class Controller {
  group(req, res) {
    const { name, description, tags } = req.body;
    let group = Group.create({
      name,
      description,
      tags,
      owner: req.user.sub
    });
    res.sendStatus(200).json({
      "success": true,
      "message": "Successful",
      "data": {
        "id": id,
        "name": group.name,
        "description": group.description,
        "tags": group.tags,
        "owner": group.owner
      }
    });
  }
  get(req, res) {
    const { id } = req.body;
    let group = Group.findOne({
      where: {
        id: id
      }
    });
    if(group == null) {
      res.sendStatus(400).json({
        "success": false,
        "message": "Group does not exist",
        "data": {}
      })
    }
    res.sendStatus(200).json({
      "success": true,
      "message": "Successful",
      "data": {
        "id": id,
        "name": group.name,
        "description": group.description,
        "tags": group.tags,
        "owner": group.owner
      }
    });
  }
}
export default new Controller();
