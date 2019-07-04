'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};
