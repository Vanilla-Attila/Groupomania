'use strict';
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');


//import models for association
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  // Model attributes are defined here
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
      as: 'User_id',
    }
  },
  post_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'Post',
      key: 'id',
      as: 'Post_id',
    }
  },
  Comment_text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Comment_text_imgURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  underscored: true,
  freezeTableName: true
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

// Comment.sync({
//   force: true
// })

module.exports = Comment