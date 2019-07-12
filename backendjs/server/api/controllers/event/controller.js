const Model = require('../../../sequelize/models');
const Event = Model.Event;
const User = Model.User;
const EventParticipation = Model.EventParticipation;
export class Controller {
  async getOne(req, res) {
    try {
      const { id } = req.params;
      let event = await Event.findOne({
        where: {
          id: id
        }
      });
      let userevents = await EventParticipation.findOne({
        where: {
          user: req.user.sub,
          event: id
        }
      });
      const member_participations = await EventParticipation.findAll({
        where: {
          event: id
        }
      });
      const members = await Promise.all(member_participations.map(function (part) {
        return User.findOne({
          where: {
            sub: part.user
          }
        });
      }));
      if (event === null) {
        res.status(400).json({
          success: false,
          message: 'Group does not exist'
        });
      } else {
        let participate = true;
        if (userevents == null) {
          participate = false;
        }
        res.status(200).json({
          success: true,
          message: 'Successful',
          data: {
            id: id,
            name: event.name,
            description: event.description,
            tags: event.tags,
            owner: event.owner,
            next: event.next,
            datetime: event.datetime,
            length: event.length,
            image: event.image,
            participating: participate,
            group_owner: event.group_owner,
            members: members
          }
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
      let userevents = await EventParticipation.findAll({
        where: {
          user: req.user.sub
        }
      });
      let eventlist = [];
      let ids = [];
      for (let i = 0; i < userevents.length; i++) {
        ids.push(userevents[i].event);
      }
      for (let i = 0; i < events.length; i++) {
        let participate = false;
        if (ids.includes(events[i].id)) {
          participate = true;
        }
        eventlist.push({
          id: events[i].id,
          name: events[i].name,
          description: events[i].description,
          tags: events[i].tags,
          owner: events[i].owner,
          next: events[i].next,
          datetime: events[i].datetime,
          length: events[i].length,
          image: events[i].image,
          participating: participate,
          group_owner: events[i].group_owner
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully Retrieved',
        data: eventlist
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
      const { name, description, next, datetime, length, tags, group_owner, owner } = req.body;
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
        tags,
        group_owner,
        owner
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
    const { name, description, next, datetime, length, tags, group_owner } = req.body;
    const owner = req.user.sub;
    try {
      let event = await Event.create({
        name,
        description,
        next,
        datetime,
        length,
        tags,
        owner,
        group_owner
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
  async join(req, res) {
    const user = req.user.sub;
    const { id } = req.params;
    try {
      let participation = await EventParticipation.create({
        user,
        event: id
      });
      res.status(200).json({
        success: true,
        message: 'Successfully Created',
        data: participation
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
