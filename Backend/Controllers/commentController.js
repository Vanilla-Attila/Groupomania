const Comment = require('../Models/Comment')
const User = require('../Models/user')
const Post = require('../Models/Post')

exports.getAllComments = async (req, res, next) => {
    try {
        const allComments = await Comment.findAll({
            where: {
                id: req.params.id
            },
            include: [User, Post]
        })
        if (!allComments) {
            return res.status(400).json({
                message: "There are no comments!"
            })
        }
        return res.status(200).send(allComments)
    } catch (err) {
        res.send({
            message: err.message
        })
    }
}

exports.getOneComment = async (res, req, next) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id
            },
        })
        if (!comment) {
            return res.status(400).json({
                message: "Comment not found!"
            })
        }
        return res.send(comment)
    } catch (err) {
        res.send({
            message: err.message
        })
    }
}

exports.createComment = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = req.body.post;
    const User_id = req.body.User_id;
    const Post_id = req.body.Post_id;
    let comment_text_img = ''
    if (req.file) {
        comment_text_img = url + '/images/' + req.file.filename;
    }
    if (!post && !comment_text_img === '') {
        return res.status(400).json({
            message: 'Please write a comment!'
        })
    }
    try {
        let newComment = await Comment.create({
            Post_id: Post_id,
            User_id: User_id,
            comment_text_img: comment_text_img,
            post: post,
            created_date: Date.now(),
        });
        return res.send(newComment);
    } catch (err) {
        return res.status(400).json({
            message: `Error: ${err.message}`
        })
    }
}

exports.modifyComment = async (req, res, next) => {

    let comment = new Comment({
        id: req.params.id
    })
    if (req.file) {
        const data = JSON.parse(req.body.comment) //string format => converted to json
        const url = req.protocol + '://' + req.get('host');
        comment = {
            userId: data.userId,
            commentText: data.Comment_text,
            CommentimgURL: url + '/images/' + req.file.filename,
            createdDate: data.createdDate,
        };
    } else {

        let ss = await Comment.findOne({
            where: {
                id: req.params.id
            }
        }).then(comment => comment)

        comment = {
            user_id: req.body.userId ? req.body.userId : ss.user_id,
            Comment_text: req.body.Comment_text,
            created_date: req.body.createdDate ? req.body.createdDate : Date.now
        };
    }

    Comment.update(comment, {
        where: {
            id: req.params.id
        }
    }).then(
        () => {
            res.status(201).json({
                message: 'Comment updated successfully!'
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

exports.deleteComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (comment) => {

            // const filename = post.imageUrl.split('/images/')[1];
            // fs.unlink('images/' + filename, () => {
            comment.destroy().then(
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