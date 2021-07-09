const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const likeCtrl = require('../Controllers/likeController')

router.post('/like', auth, likeCtrl.like)
router.delete('/delete/:id', auth, likeCtrl.delete)

module.exports = router