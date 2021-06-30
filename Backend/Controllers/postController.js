const db = require('../Models');
const fs = require('fs');

exports.createPost = async (req, res, next) => {
  // User_id = ...
  // post_text = ...
  // img: ...
  console.log(req.body);
  //1st find the user
  User.findOne

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

  // using mongose to select the sause then get the image URL out in a  variable then use this variable with the update function 
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
      userId: data.userId,
      postText: data.Post_text,
      PostimgURL: url + '/images/' + req.file.filename,
      createdDate: data.createdDate,
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
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Post.deleteOne({
          id: req.params.id
        }).then(
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
    }
  );
};

exports.getAllPosts = (req, res, next) => {
  db.Post.findAll({
    include: db.User
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

// Work needs later
exports.likePost = async (req, res, next) => {
  try {
    const foundPost = await Post.findOne({
      id: req.params.id
    });
    const userId = req.body.userId;
    const like = req.body.like;
    if (like === 1) {
      if (!foundPost.usersLiked.includes(userId)) {
        foundPost.usersLiked.push(userId)
      }
    } else {
      if (foundPost.usersLiked.includes(userId)) {
        const userindex = foundPost.usersLiked.indexOf(userId)
        foundPost.usersLiked.splice(userindex)
      }
      foundPost.likes = foundPost.usersLiked.length
    }
    if (like === -1) {
      if (!foundPost.usersDisliked.includes(userId)) {
        foundPost.usersDisliked.push(userId)
      }
    } else {
      if (foundPost.usersDisliked.includes(userId)) {
        const userindex = foundPost.usersDisliked.indexOf(userId)
        foundPost.usersDisliked.splice(userindex)
      }
    }
    foundPost.dislikes = foundPost.usersDisliked.length

    foundPost.create()
    res.status(200).json({
      message: 'user liked or dislikes successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error
    })
  }
};