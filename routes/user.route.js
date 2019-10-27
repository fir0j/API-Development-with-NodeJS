const express = require('express');
const router = express.Router();
const { userById, getUserById, getAllUser, createUser } = require('../controllers/user.controller');
const { comment, uncomment } = require('../controllers/post.controller');
const { userValidator } = require('../validators/user.validator');

//any route containing /user/:userId, our app will first execute userById and then getUser
router.get('/user/:userId', getUserById);
router.param('userId', userById);
router.post('/user', userValidator, createUser);
router.get('/user', getAllUser);

module.exports = router;
