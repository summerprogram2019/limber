'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    profile: DataTypes.STRING,
    sub: {type: DataTypes.STRING, primaryKey: true}
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
