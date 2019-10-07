const express = require('express');
const router = express.Router();
const { getUsers, createUsers } = require('../controllers/user.controller');
const { userValidator } = require('../validators/user.validator');

router.get('/users', getUsers);
router.post('/users', userValidator, createUsers);

// //comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
