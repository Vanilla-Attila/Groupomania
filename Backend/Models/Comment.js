'use strict';
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');

//import models for association
const User = require('./user');
const Post = require('../Post');

const Comment = sequelize.define('Post', {
  // Model attributes are defined here
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
  },
}, {
  underscored: true
});

//DB relations
User.hasMany(Comment, {
  onDelte: 'cascade'
});
Post.hasMany(Comment, {
  onDelete: 'cascade'
});

Comment.belongsTo(User, {
  onDelete: 'cascade'
});
Comment.belongsTo(Post, {
  onDelete: 'cascade'
});

module.exports = Post