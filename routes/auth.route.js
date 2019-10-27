const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/auth.controller');
const { signupValidator } = require('../validators/user.validator');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);

module.exports = router;
