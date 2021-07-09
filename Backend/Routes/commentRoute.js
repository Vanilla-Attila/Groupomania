const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../Controllers/commentController');


router.get('/', commentCtrl.getAllComments);
router.post('/createComment', commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.put('/:id', auth, multer, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.post('/:id/like', auth, commentCtrl.likeComment);


module.exports = router;