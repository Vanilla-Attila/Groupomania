const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Display = sequelize.define('Display', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  User_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Post_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Post_imgURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Post_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Comment_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Comment_imgURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Post_like: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  User_like: {
    type: DataTypes.ARRAY,
    allowNull: true
  },
});

// `sequelize.define` also returns the model
console.log(Display === sequelize.models.Display); // true

module.exports = display