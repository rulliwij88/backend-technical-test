'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_group_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      priority: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'very-high'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};