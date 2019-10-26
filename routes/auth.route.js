const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth.controller');
// const { authValidator } = require('../validators/auth.validator');

router.post('/signup', signup);

module.exports = router;
