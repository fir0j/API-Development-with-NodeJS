const express = require('express');
const router = express.Router();
const { getUser, postUser } = require('../controllers/user.controller');
const { userValidator } = require('../validators/user.validator');

router.get('/user', getUser);
router.post('/user', userValidator, postUser);

// //comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
