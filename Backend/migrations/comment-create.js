module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Comment', {
      id: {
        type: DataTypes.INTEGER,
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
      Post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'UserId',
        }
      },
      Comment_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Comment_text_imgURL: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }),
  down: (queryInterface /* , Sequelize */ ) => queryInterface.dropTable('Comment'),
};