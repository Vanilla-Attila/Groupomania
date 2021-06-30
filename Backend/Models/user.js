'use strict';
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
  }
}, {
  underscored: true,
  freezeTableName: true
});

module.exports = User