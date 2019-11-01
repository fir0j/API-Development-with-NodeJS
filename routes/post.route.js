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
	like,
	unlike,
	comment,
	uncomment
} = require('../controllers/post.controller');
const { postValidator } = require('../validators/post.validator');

router.get('/posts	', getAllPost);
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

//any route containing /user/:userId, /post/:postId our app will first execute userById and then the middleware, postById and then the middleware
router.get('/post/:postId', getPostById);
router.get('/post/by/:userId', postByUser);
router.post('/post/new/:userId', requireSignin, createPost, postValidator);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

router.param('userId', userById);
router.param('postId', postById);

module.exports = router;
