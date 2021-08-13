const Like = require("../Models/Likes")

exports.like = async (req, res, next) => {
    console.log('req', req.body)
    try {
        const newLike = await Like.create({
            user_id: req.body.user_id,
            post_id: req.body.post_id,

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
exports.getall = async (req, res, next) => {
    const like = await Like.findAll()
    if (!like) {
        return res.send({
            message: 'Post not liked yet'
        })
    }
    try {

        res.send({
            like
        })
    } catch (error) {
        return res.status(500).send({
            message: `Error: ${error.message}`
        })
    }
}