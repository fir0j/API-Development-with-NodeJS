const express = require('express');
const router = express.Router();
const {
	userById,
	getUserById,
	getAllUser,
	createUser,
	updateUserProfile,
	deleteUser,
	addFollowing,
	addFollower,
	removeFollowing,
	removeFollower
} = require('../controllers/user.controller');
const { comment, uncomment } = require('../controllers/post.controller');
const { userValidator } = require('../validators/user.validator');
const { requireSignin } = require('../controllers/auth.controller');

//any route containing /user/:userId, our app will first execute userById and then getUser
router.param('userId', userById);
router.get('/users', getAllUser);
router.get('/user/:userId', requireSignin, getUserById);
router.post('/user', userValidator, createUser);
router.put('/user/:userId', requireSignin, updateUserProfile);
router.delete('/user/:userId', requireSignin, deleteUser);
router.put('/user/follow', requireSignin, addFollowing, addFollower);
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);

module.exports = router;
