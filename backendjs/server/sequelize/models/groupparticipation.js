'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupParticipation = sequelize.define('GroupParticipation', {
    group: DataTypes.INTEGER,
    user: DataTypes.STRING
  }, {});
  GroupParticipation.associate = function(models) {
    GroupParticipation.hasMany(models.User, { foreignKey: 'sub', sourceKey: 'user' });
    GroupParticipation.hasMany(models.Group, { foreignKey: 'id', sourceKey: 'group' });
  };
  return GroupParticipation;
};
