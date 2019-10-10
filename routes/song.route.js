const express = require('express');
const router = express.Router();
const { postSong, song, allSong, deleteSong, songById, comment, uncomment } = require('../controllers/song.controller');
const { songValidator } = require('../validators/song.validator');

router.param('songId', songById);
router.get('/song/:songId', song);
router.get('/song', allSong);
router.post('/song', songValidator, postSong);
router.delete('/song', deleteSong);
router.post('/song/comment', comment);
router.post('/song', uncomment);

// comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
