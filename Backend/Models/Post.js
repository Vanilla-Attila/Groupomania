'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE', 
      }),
        models.Post.hasMany(models.Comment )
      models.Post.hasMany(models.Like)

    }
  };
  Post.init({
    postText: { type: DataTypes.TEXT, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    createdDate: { type: DataTypes.DATE, allowNull: true },


  }, {
    sequelize,

    modelName: 'Post',
  });
  return Post;
};


// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// const Comment = require('./Comment')
// const Likes = require('./Likes');
// const User = require('./user');
// const Post = sequelize.define('Post', {
//   // Model attributes are defined here
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement:true
//   },
//   Post_text: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   Post_imgURL: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   createdDate: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   Post_like: {
//     type: DataTypes.NUMBER,
//     allowNull: true
//   },
// },
//   {underscored: true}
// );
// Post.belongsTo(User, { as: 'User_Id', constraints: false })
// Post.hasMany(Comment)
// Comment.belongsTo(Post, { as: 'Post_Id', constraints: false })
// Post.hasMany(Likes)
// Likes.belongsTo(Post, { as: 'Post_Id', constraints: false })
// // `sequelize.define` also returns the model
// console.log("Post",Post === sequelize.models.Post); // true

// module.exports = Post