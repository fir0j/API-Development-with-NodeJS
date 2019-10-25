const express = require('express');
const router = express.Router();
const { userById, getUser, getAllUser, createUser } = require('../controllers/user.controller');
const { comment, uncomment } = require('../controllers/post.controller');
const { userValidator } = require('../validators/user.validator');

router.post('/user', userValidator, createUser);
router.get('/user/:userId', getUser);
router.get('/user', getAllUser);
router.param('userId', userById);

// //comments
router.put('/song/comment', comment);
router.put('/song/uncomment', uncomment);

module.exports = router;
