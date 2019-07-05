'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    tags: DataTypes.JSON,
    owner: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.hasOne(User, { foreignKey: 'sub', sourceKey: 'owner' })
  };
  return Group;
};
