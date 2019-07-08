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
  async get(req, res) {
    try {
      let groups = await Group.findAll();
      res.status(200).json({
        success: true,
        message: 'Successfully Retrieved',
        data: groups
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        messasge: error.message
      });
    }
  }
}
export default new Controller();
