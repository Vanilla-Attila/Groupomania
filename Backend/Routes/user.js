const express = require('express');
const router = express.Router();
const isAdmin = require('../Middleware/isAdmin')
const userCtrl = require('../Controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAll', isAdmin, userCtrl.getAllUsers);
router.post('/updateUser', isAdmin, userCtrl.updateUser);
router.post('/deleteUser', isAdmin, userCtrl.deleteUser);


module.exports = router;