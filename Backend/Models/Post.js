'use strict';
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');

//User model
const User = require('./user.js');

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'User',
      key: 'id',
      as: 'User_Id',
    }
  },
  Post_text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Post_imgURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  underscored: true,
  freezeTableName: true,
  sync: {
    force: true
  }
});

User.hasMany(Post, {
  onDelete: 'cascade'
});
Post.belongsTo(User, {
  onDelete: 'cascade'
});

module.exports = Post