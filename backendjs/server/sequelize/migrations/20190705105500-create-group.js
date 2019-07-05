'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Group', 'owner', Sequelize.STRING)
      .then(function () {
        queryInterface.addConstraint('Group', ['owner'], {
          type: 'foreign key',
          name: 'group_owner_fkey',
          references: {
            table: 'User',
            field: 'sub'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Group', 'group_owner_fkey')
      .then(function () {
        queryInterface.removeConstraint('Group', 'owner');
      });
  }
};
