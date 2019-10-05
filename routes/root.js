const express = require('express');
const router = express.Router();
const { getRoot } = require('../controllers/rootController');

router.get('/', getRoot);

module.exports = router;
