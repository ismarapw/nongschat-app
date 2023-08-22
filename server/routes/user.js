const express = require('express');
const userController = require("../controllers/user");
const handleRegister = require("../middlewares/registerUser");
const handleUpload = require('../middlewares/fileUpload');
const handleLogin = require("../middlewares/loginUser");
const handleUpdate = require("../middlewares/updateUser");

const router = express.Router();

router.post('/register',  handleRegister.validateUserReg, userController.registerUser);
router.post('/login', handleLogin.validateUserLogin, userController.loginAuth);
router.patch('/update/image', handleUpload.fileUpload, userController.updatePicture);
router.patch('/update/username', handleUpdate.validateUserName, userController.updateUsername);
router.patch('/update/password', handleUpdate.validatePassword, userController.updatePassword);
router.patch('/update/email', handleUpdate.validateEmail, userController.updateEmail);
router.post('/logout', userController.logout);
router.get('/update/profile', userController.getProfile);
router.get('/latest', userController.getLatestUser);
router.get('/search/:username', userController.getSearchedUser);
router.get('/:id/profile', userController.getOtherUserProfile);

module.exports = router;