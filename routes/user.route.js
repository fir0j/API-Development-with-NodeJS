const express = require('express');
const router = express.Router();
const {
	userById,
	getUserById,
	getAllUser,
	createUser,
	updateUserProfile,
	deleteUser
} = require('../controllers/user.controller');
const { comment, uncomment } = require('../controllers/post.controller');
const { userValidator } = require('../validators/user.validator');
const { requireSignin } = require('../controllers/auth.controller');

//any route containing /user/:userId, our app will first execute userById and then getUser
router.get('/user/:userId', requireSignin, getUserById);
router.param('userId', userById);
router.post('/user', userValidator, createUser);
router.get('/user', getAllUser);
router.put('/user/:userId', requireSignin, updateUserProfile);
router.delete('/user/:userId', requireSignin, deleteUser);

module.exports = router;
