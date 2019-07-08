'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventParticipation = sequelize.define('EventParticipation', {
    event: DataTypes.INTEGER,
    user: DataTypes.STRING
  }, {});
  EventParticipation.associate = function(models) {
    EventParticipation.hasMany(models.User, { foreignKey: 'sub', sourceKey: 'user' });
    EventParticipation.hasMany(models.Event, { foreignKey: 'id', sourceKey: 'event' });
  };
  return EventParticipation;
};
