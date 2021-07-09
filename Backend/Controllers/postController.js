const db = require('../Models');
const fs = require('fs');
const Post = require('../Models/Post');

exports.createPost = async (req, res, next) => {
  const User_id = req.body.User_id
  const post_text = req.body.Post_text

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
    }
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
    const data = JSON.parse(req.body.post) //string format => converted to json
    const url = req.protocol + '://' + req.get('host');
    post = {
      userId: data.userId,
      postText: data.Post_text,
      PostimgURL: url + '/images/' + req.file.filename,
      createdDate: data.createdDate,
    };
  } else {

    let ss = await Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(post => post)

    post = {
      user_id: req.body.userId ? req.body.userId : ss.user_id,
      Post_text: req.body.Post_text,
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
    // include: [{
    //   model: db.comment
    // }]
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