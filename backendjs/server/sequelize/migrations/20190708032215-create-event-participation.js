'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventParticipations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
          key: 'id'
        }
      },
      user: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'sub'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EventParticipations');
  }
};
