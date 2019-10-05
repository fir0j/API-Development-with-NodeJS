const express = require('express');
const router = express.Router();
const { getUsers, createUsers } = require('../controllers/usersController');

router.get('/users', getUsers);
router.post('/users', createUsers);

module.exports = router;
