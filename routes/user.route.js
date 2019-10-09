const express = require('express');
const router = express.Router();
const { userById, getUser, getAllUser, postUser } = require('../controllers/user.controller');
const { userValidator } = require('../validators/user.validator');

router.post('/user', userValidator, postUser);
router.get('/user/:userId', getUser);
router.get('/user', getAllUser);
router.param('userId', userById);

// //comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
