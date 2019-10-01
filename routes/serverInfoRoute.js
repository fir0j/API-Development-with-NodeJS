const express = require('express');
const serverInfoController = require('../controllers/serverInfoController');
const router = express.Router();

router.get('/', serverInfoController.serverInfo);

module.exports = router;
