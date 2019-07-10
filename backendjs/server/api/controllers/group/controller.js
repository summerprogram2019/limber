const Model = require('../../../sequelize/models');
const Group = Model.Group;

export class Controller {
  async getOne(req, res) {
    try {
      const { id } = req.params;
      let group = await Group.findOne({
        where: {
          id: id
        }
      });
      if (group === null) {
        res.status(400).json({
          success: false,
          message: 'Group does not exist'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Successful',
          data: group
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        messasge: error.message
      });
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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, tags, image } = req.body;
      let group = await Group.findOne({
        where: {
          id: id
        }
      });
      if (group === null) {
        res.status(400).json({
          success: false,
          message: 'Group does not exist'
        });
      }
      if (group.owner !== req.user.sub) {
        res.status(403).json({
          success: false,
          message: 'You are not the owner of the group'
        });
      }
      let updated = await group.update({
        name,
        description,
        tags,
        image
      });
      res.status(200).json({
        success: true,
        message: 'Successful',
        data: updated
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        messasge: error.message
      });
    }
  }

  async create(req, res) {
    const { name, description, tags, image } = req.body;
    const owner = req.user.sub;
    try {
      let group = await Group.create({
        name,
        description,
        tags,
        image,
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
