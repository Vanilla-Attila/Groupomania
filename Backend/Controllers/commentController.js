const Comment = require('../Models/Comment')
const db = require('../Models')

exports.getAllComments = async (req, res, next) => {
    try {
        const allComments = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            // include: [db.User, db.Post]
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
    const User_id = req.body.user_id;
    const Post_id = req.body.post_id;
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
            post_id: Post_id,
            user_id: User_id,
            Comment_text: req.body.Comment_text,
            Comment_text_imgURL: comment_text_img,
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
            Comment_text: data.Comment_text,
            Comment_text_imgURL: url + '/images/' + req.file.filename,
            created_date: data.createdDate,
        };
    } else {

        let ss = await Comment.findOne({
            where: {
                id: req.params.id
            }
        }).then(comment => comment)

        comment = {
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