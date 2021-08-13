'use strict';
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');

const User = require('./user.js');
const Post = require('./Post');

const Like = sequelize.define('Like', {
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
      as: 'User_Id',
    }
  },
  post_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'Post',
      key: 'id',
      as: 'Post_Id',
    }
  },
}, {
  underscored: true,
  freezeTableName: true,
  sync: {
    force: true
  }
});
// Like.belongsTo(User, {
//   onDelete: 'cascade'
// });
// Like.belongsTo(Post, {
//   onDelete: 'cascade'
// });
module.exports = Like

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Like extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Like.belongsTo(models.User, {
//           foreignKey: {
//             allowNull: false
//           },
//           onDelete: 'CASCADE',
//         }),

//         models.Like.belongsTo(models.Post, {
//           foreignKey: {
//             allowNull: false
//           },
//           onDelete: 'CASCADE',
//         })


//     }
//   };
//   Like.init({

//   }, {
//     sequelize,

//     modelName: 'Like',
//     freezeTableName: true,
//   });
//   return Like;
// };


// // const { Sequelize, DataTypes } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');
// // const Comment = require('./Comment')
// // const Likes = require('./Likes');
// // const User = require('./user');
// // const Post = sequelize.define('Post', {
// //   // Model attributes are defined here
// //   id: {
// //     type: DataTypes.INTEGER,
// //     allowNull: false,
// //     primaryKey: true,
// //     autoIncrement:true
// //   },
// //   Post_text: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   Post_imgURL: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   createdDate: {
// //     type: DataTypes.DATE,
// //     allowNull: false
// //   },
// //   Post_like: {
// //     type: DataTypes.NUMBER,
// //     allowNull: true
// //   },
// // },
// //   {underscored: true}
// // );
// // Post.belongsTo(User, { as: 'User_Id', constraints: false })
// // Post.hasMany(Comment)
// // Comment.belongsTo(Post, { as: 'Post_Id', constraints: false })
// // Post.hasMany(Likes)
// // Likes.belongsTo(Post, { as: 'Post_Id', constraints: false })
// // // `sequelize.define` also returns the model
// // console.log("Post",Post === sequelize.models.Post); // true

// // module.exports = Post

// // const { Sequelize, DataTypes } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');


// // const Likes = sequelize.define('Likes', {
// //   // Model attributes are defined here
// //   id: {
// //     type: DataTypes.INTEGER,
// //     allowNull: false,
// //     primaryKey: true,
// //     autoIncrement:true
// // },
// //   like: {
// //     type: DataTypes.NUMBER,
// //     allowNull: false
// //   },
// // },
// //   {underscored: true}
// // );

// // // `sequelize.define` also returns the model
// // console.log("Likes",Likes === sequelize.models.Likes); // true

// // // Likes.hasMany(User);
// // // Likes.hasMany(Post);

// // module.exports = Likes