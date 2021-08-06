const db = require('../Models/index.js');
const fs = require('fs');
const Post = require('../Models/Post');
const User = require('../Models/user');
const Comment = require('../Models/Comment');


exports.createPost = async (req, res, next) => {

  let body = req.body
  const User_id = req.body.User_id
  const post_text = req.body.post_text

  let postImg

  console.log(req.body);


  if (!req.file) {
    postImg = ''
  } else {
    const url = req.protocol + '://' + req.get('host')
    const postImgURL = url + '/images/' + req.file.filename
    postImg = postImgURL
  }
  if (!postImg && !post_text) {
    return res.status(400).json({
      message: 'Content missing!'
    })
  }

  try {
    let newPost = await Post.create({
      user_id: User_id,
      created_date: Date.now,
      Post_imgURL: postImg,
      Post_text: post_text
    })
    return res.send(newPost)
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User
    }]
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyPost = async (req, res, next) => {

  let post = new Post({
    id: req.params.id
  })
  if (req.file) {
    const data = req.body //string format => converted to json
    const url = req.protocol + '://' + req.get('host');
    post = {
      userId: data.User_id,
      postText: data.post_text,
      Post_imgURL: url + '/images/' + req.file.filename,
      createdDate: data.createdDate,
    };
  } else {

    let ss = await Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(post => post)

    post = {
      user_id: req.body.User_id ? req.body.User_id : ss.user_id,
      Post_text: req.body.post_text,
      created_date: req.body.createdDate ? req.body.createdDate : Date.now
    };
  }

  Post.update(post, {
    where: {
      id: req.params.id
    }
  }).then(
    () => {
      res.status(201).json({
        message: 'Post updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deletePost = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (post) => {

      // const filename = post.imageUrl.split('/images/')[1];
      // fs.unlink('images/' + filename, () => {
      post.destroy().then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    });
  //}
  //);
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [{
      model: User

    }, {

      model: Comment,
      include: {
        model: User
      }
    }]
  }).then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};