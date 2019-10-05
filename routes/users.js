const express = require('express');
const router = express.Router();
const { getUsers, createUsers } = require('../controllers/usersController');
const { createUsersValidator } = require('../validators/index');

router.get('/users', getUsers);
router.post('/users', createUsersValidator, createUsers);

module.exports = router;
