'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Groups', 'owner', Sequelize.STRING)
      .then(function () {
        queryInterface.addConstraint('Groups', ['owner'], {
          type: 'foreign key',
          name: 'group_owner_fkey',
          references: {
            table: 'Users',
            field: 'sub'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Groups', 'group_owner_fkey')
      .then(function () {
        queryInterface.removeConstraint('Groups', 'owner');
      });
  }
};
