
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }, 
 User_Id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'User_Id',
        },
    },
  Post_Id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Post',
          key: 'id',
          as: 'Post_Id',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Likes'),
};