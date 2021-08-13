const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const likeCtrl = require('../Controllers/likeController')
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, likeCtrl.like)
router.delete('/delete/:id', auth, likeCtrl.delete)
router.get('/', auth, likeCtrl.getall)

module.exports = router