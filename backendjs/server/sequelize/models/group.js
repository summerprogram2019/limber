import db from './index.js';
const User = db.User;

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
    Group.hasOne(models.User, { foreignKey: 'sub', sourceKey: 'owner' })
  };
  return Group;
};
