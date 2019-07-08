module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      tags: DataTypes.JSON,
      owner: DataTypes.STRING
    },
    {}
  );
  Group.associate = function(models) {
    Group.hasOne(models.User, { foreignKey: 'sub', sourceKey: 'owner' });
  };
  return Group;
};
