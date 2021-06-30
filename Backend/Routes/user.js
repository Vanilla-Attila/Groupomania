const express = require('express');
const router = express.Router();
const isAdmin = require('../Middleware/isAdmin')
const userCtrl = require('../Controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAll/', userCtrl.getAllUsers);
router.get('/getOne', userCtrl.getOneUser);
router.put('/updateUser', userCtrl.updateUser);
router.delete('/deleteUser', userCtrl.deleteUser);


module.exports = router;