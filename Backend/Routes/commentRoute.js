const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../Controllers/commentController');


router.get('/:id', commentCtrl.getAllComments);
router.post('/createComment', commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);


module.exports = router;