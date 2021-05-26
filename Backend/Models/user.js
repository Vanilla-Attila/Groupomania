const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false
},
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = user