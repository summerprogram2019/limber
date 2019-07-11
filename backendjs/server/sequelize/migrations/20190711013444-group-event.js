'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Events', 'group_owner', Sequelize.INTEGER)
      .then(function () {
        queryInterface.addConstraint('Events', ['group_owner'], {
          type: 'foreign key',
          name: 'event_group_owner_fkey',
          references: {
            table: 'Groups',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Events', 'group_owner');
  }
};
