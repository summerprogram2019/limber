const Model = require('../../../sequelize/models');
const Group = Model.Group;

export class Controller {
  async group(req, res) {
    try {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        messasge: error.message
      });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.body;
      let group = Group.findOne({
        where: {
          id: id
        }
      });
    } catch (error) {
      if (group == null) {
        res.sendStatus(400).json({
          "success": false,
          "message": "Group does not exist",
          "data": {}
        });
      }
      
    }
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
  update(req, res) {
    const id = req.param.id
    const { name, description, tags } = req.body;
    let group = Group.findOne({
      where: {
        id: id
      }
    });
    if (group == null) {
      res.sendStatus(400).json({
        "success": false,
        "message": "Group does not exist",
        "data": {}
      })
    }
    group.name = name
    group.description = description
    group.tags = tags
    group.save().then(() => {})
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
  async create(req, res) {
    const { name, description, tags } = req.body;
    const owner = req.user.sub;
    try {
      let group = await Group.create({
        name,
        description,
        tags,
        owner
      });
      res.status(200).json({
        success: true,
        message: 'Successfully Created',
        data: group
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}
export default new Controller();
