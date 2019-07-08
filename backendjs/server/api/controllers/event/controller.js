const Model = require('../../../sequelize/models');
const Event = Model.Event;
export class Controller {
  async event(req, res) {
    try {
      const { name, description, tags } = req.body;
      let event = await Event.create({
        name,
        description,
        tags,
        owner: req.user.sub
      });
      res.sendStatus(200).json({
        success: true,
        message: 'Successful',
        data: {
          name: event.name,
          description: event.description,
          next: event.next,
          datetime: event.datetime,
          length: event.length,
          tags: event.tags,
          owner: event.owner
        }
      });
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
}
export default new Controller();
