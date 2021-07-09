const Like = require('../Models/Likes')
const User = require('../Models/user')
const Post = require('../Models/Post')

exports.like = async (req, res, next) => {
    try {
        const newLike = await Like.create({
            User_id: req.body.User_id,
            Post_id: req.body.Post_id,
            id: req.body.id
        })
        return res.send(newLike)
    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}

exports.delete = async (req, res, next) => {
    const like = await Like.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!like) {
        return res.send({
            message: 'Post not liked yet'
        })
    }
    try {
        await like.destroy()
        res.send({
            message: 'Like deleted successfully'
        })
    } catch (error) {
        return res.status(500).send({
            message: `Error: ${error.message}`
        })
    }
}