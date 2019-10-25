const express = require('express');
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

router.param('postId', postById);
router.get('/post/:postId', post);
router.get('/post', allPost);
router.post('/post', postValidator, createPost);
router.delete('/post', deletePost);
router.post('/post/comment', comment);
router.post('/post', uncomment);

// comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
