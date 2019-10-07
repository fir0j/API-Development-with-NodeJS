const express = require('express');
const router = express.Router();
const { postSong, getSong, deleteSong, comment, uncomment } = require('../controllers/song.controller');
const { songValidator } = require('../validators/song.validator');

router.get('/song', getSong);
router.post('/song', songValidator, postSong);
router.delete('/song', deleteSong);

// comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
