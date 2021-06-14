const User = require('../Models/user');

module.exports = (res, req, next) => {
    const user =  User.findById(req.params.id);
    if (user.isAdmin) {
        next()
    } else {
        res.status(401).json({
      error: new Error('Invalid request!')
    })
}
}