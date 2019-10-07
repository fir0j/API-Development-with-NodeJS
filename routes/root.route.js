const express = require('express');
const router = express.Router();
const { getRoot } = require('../controllers/root.controller');

router.get('/', getRoot);

module.exports = router;
