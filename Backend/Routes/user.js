const express = require('express');
const router = express.Router();
const isAdmin = require('../Middleware/isAdmin')
const userCtrl = require('../Controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAll/', userCtrl.getAllUsers);
router.get('/getOne/:id', userCtrl.getOneUser);
router.put('/updateUser', auth, multer, userCtrl.updateUser);
router.delete('/deleteUser', userCtrl.deleteUser);


module.exports = router;