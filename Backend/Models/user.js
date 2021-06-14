'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
 
      models.User.hasMany(models.Post)
      models.User.hasMany(models.Comment)
      models.User.hasMany(models.Like)

    }
  };
  User.init({
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN , allowNull: false , defaultValue:false },


  }, {
    sequelize,

    modelName: 'User',
  });
  return User;
};


// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const Post = require('./Post')
// const Comment = require('./Comment')
// const Likes = require('./Likes');

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement:true
// },  
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
// },  
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
// },
//   {underscored: true ,
//   }
// );


// //User.hasMany(Post)
// //Post.belongsTo(User, { as: 'User_Id', constraints: false })
// User.hasMany(Comment)
// Comment.belongsTo(User, { as: 'User_Id', constraints: false })
// User.hasMany(Likes)
// Likes.belongsTo(User, { as: 'User_Id', constraints: false })
// //User.sync({force: true})
// // `sequelize.define` also returns the model
// console.log("user" ,User === sequelize.models.User); // true
// console.log("Models" ,sequelize.models); // true

// module.exports = User