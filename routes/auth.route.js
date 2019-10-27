const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth.controller');
const { signupValidator } = require('../validators/user.validator');

router.post('/signup', signupValidator, signup);

module.exports = router;
