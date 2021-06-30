'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Post', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'UserId',
        }
      },
      Post_text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Post_imgURL: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }),
  down: (queryInterface /* , Sequelize */ ) => queryInterface.dropTable('Post'),
};