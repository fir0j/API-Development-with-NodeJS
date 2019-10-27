const express = require('express');
const { requireSignin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');
const router = express.Router();
const {
	createPost,
	post,
	allPost,
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
router.get('/post/:postId', post);
router.get('/post', allPost);
router.post('/post', requireSignin, postValidator, createPost);
router.delete('/post', deletePost);
router.post('/post/comment', comment);
router.post('/post', uncomment);

// comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
