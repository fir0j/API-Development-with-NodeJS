const express = require('express');
const { requireSignin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');
const router = express.Router();
const {
	createPost,
	getPostById,
	getAllPost,
	deletePost,
	postById,
	comment,
	uncomment
} = require('../controllers/post.controller');
const { postValidator } = require('../validators/post.validator');

//any route containing /user/:userId, our app will first execute userById and then getUser
router.param('userId', userById);
//any route containing /post/:postId, our app will first execute postById and then post
router.param('postId', postById);
router.get('/post/:postId', getPostById);
router.get('/post', getAllPost);
router.post('/post', requireSignin, postValidator, createPost);
router.delete('/post', deletePost);

// comments
// router.put('/post/comment', comment);
// router.put('/post/uncomment', uncomment);

module.exports = router;
