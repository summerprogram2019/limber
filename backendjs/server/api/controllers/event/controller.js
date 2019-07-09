const Model = require('../../../sequelize/models');
const Event = Model.Event;

export class Controller {
  async getOne(req, res) {
    try {
      const { id } = req.params;
      let event = await Event.findOne({
        where: {
          id: id
        }
      });
      if (event === null) {
        res.status(400).json({
          success: false,
          message: 'Group does not exist'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Successful',
          data: event
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
      let events = await Event.findAll();
      res.status(200).json({
        success: true,
        message: 'Successfully Retrieved',
        data: events
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
      const { name, description, next, datetime, length, tags } = req.body;
      let event = await Event.findOne({
        where: {
          id: id
        }
      });
      if (event === null) {
        res.status(400).json({
          success: false,
          message: 'Group does not exist'
        });
      }
      if (event.owner !== req.user.sub) {
        res.status(403).json({
          success: false,
          message: 'You are not the owner of the group'
        });
      }
      let updated = await event.update({
        name,
        description,
        next,
        datetime,
        length,
        tags
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
    const { name, description, next, datetime, length, tags } = req.body;
    const owner = req.user.sub;
    try {
      let event = await Event.create({
        name,
        description,
        next,
        datetime,
        length,
        tags,
        owner
      });
      res.status(200).json({
        success: true,
        message: 'Successfully Created',
        data: event
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
