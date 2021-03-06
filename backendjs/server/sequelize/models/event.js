'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    next: DataTypes.INTEGER,
    datetime: DataTypes.DATE,
    length: DataTypes.INTEGER,
    tags: DataTypes.JSONB,
    owner: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.hasOne(models.Event, { foreignKey: 'id', sourceKey: 'next' });
    Event.hasOne(models.User, { foreignKey: 'sub', sourceKey: 'owner' });
  };
  return Event;
};
