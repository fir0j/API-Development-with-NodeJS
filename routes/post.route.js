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
	postByUser,
	isPoster,
	updatePost,
	comment,
	uncomment
} = require('../controllers/post.controller');
const { postValidator } = require('../validators/post.validator');

router.get('/posts	', getAllPost);
router.get('/post/:postId', getPostById);
router.get('/post/by/:userId', postByUser);
router.post('/post/new/:userId', requireSignin, createPost, postValidator);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

//any route containing /user/:userId, our app will first execute userById and then getUser
router.param('userId', userById);
//any route containing /post/:postId, our app will first execute postById and then post
router.param('postId', postById);

// comments
// router.put('/post/comment', comment);
// router.put('/post/uncomment', uncomment);

module.exports = router;
