'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    tags: DataTypes.JSON
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};
