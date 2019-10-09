const express = require('express');
const router = express.Router();
const { postSong, song, getAllSong, deleteSong, songById } = require('../controllers/song.controller');
const { songValidator } = require('../validators/song.validator');

router.get('/song', getAllSong);
router.get('/song/:songId', song);
router.post('/song', songValidator, postSong);
router.delete('/song', deleteSong);
router.param('songId', songById);

// comments
// router.put('/song/comment', comment);
// router.put('/song/uncomment', uncomment);

module.exports = router;
