const express = require('express');
const router = express.Router();
const { getAPIEndPoints } = require('../controllers/root.controller');

router.get('/', getAPIEndPoints);

module.exports = router;
