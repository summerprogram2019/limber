const Model = require('../../../sequelize/models');
const Group = Model.Group;
const GroupParticipation = Model.GroupParticipation;
export class Controller {
  async getOne(req, res) {
    try {
      const { id } = req.params;
      let group = await Group.findOne({
        where: {
          id: id
        }
      });
      let usergroups = await GroupParticipation.findOne({
        where: {
          user: req.user.sub,
          group: id
        }
      });
      if (group === null) {
        res.status(400).json({
          success: false,
          message: 'Group does not exist'
        });
      } else {
        let participate = true;
        if (usergroups == null) {
          participate = false;
        }
        res.status(200).json({
          success: true,
          message: 'Successful',
          data: {
            id: id,
            name: group.name,
            description: group.description,
            tags: group.tags,
            image: group.image,
            participating: participate
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
      let groups = await Group.findAll();
      let usergroups = await GroupParticipation.findAll({
        where: {
          user: req.user.sub
        }
      });
      let grouplist = [];
      let ids = [];
      for (let i = 0; i < usergroups.length; i++) {
        ids.push(usergroups[i].group);
      }
      for (let i = 0; i < groups.length; i++) {
        let participate = false;
        if (ids.includes(groups[i].id)) {
          participate = true;
        }
        grouplist.push({
          id: groups[i].id,
          name: groups[i].name,
          description: groups[i].description,
          tags: groups[i].tags,
          image: groups[i].image,
          participating: participate
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully Retrieved',
        data: grouplist
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
  async join(req, res) {
    const user = req.user.sub;
    const { id } = req.params;
    try {
      let participation = await GroupParticipation.create({
        user,
        group: id
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
