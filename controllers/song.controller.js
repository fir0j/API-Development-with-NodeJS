const SONG = require('../models/song.model');

//populate method will only populate if SONG schema has a field call postedBy and it already contains id of documents of other schema
exports.songById = (request, response, next, id) => {
	SONG.findById(id).populate('postedBy').populate('comments.postedBy', 'firstName').exec((err, song) => {
		if (err || !song) {
			return response.status(400).json({
				error: 'Song not found'
			});
		}
		request.song = song;
		console.log('populated postedBy field');
		next();
	});
};

exports.song = (request, response) => {
	return response.json(request.song);
};

exports.postSong = (request, response) => {
	let song = new SONG(request.body);
	song
		.save()
		.then((result) => response.json({ message: 'success' }))
		.catch((err) => response.json({ message: 'unable to post song' }));
};

exports.allSong = (request, response) => {
	SONG.find()
		.populate('comments.postedBy', '_id name')
		.then((songs) => response.json(songs))
		.catch((err) => response.json({ message: 'failed to fetch songs' }));
};

exports.deleteSong = (request, response) => {
	let song = songSchema;
	song
		.deleteOne({})
		.then((result) => response.json({ message: 'delete success' }))
		.catch((err) => response.json({ message: 'failed to delete song' }));
};

exports.comment = (request, response) => {
	let comment = request.body.comment;
	comment.postedBy = request.body.userId;
	//where does request.body.userId pointing to?

	SONG.findByIdAndUpdate(request.body.songId, { $push: { comments: comment } }, { new: true })
		.populate('comments.postedBy', '_id name')
		.populate('postedBy', '_id name')
		.exec((err, result) => {
			if (err) {
				return response.json({
					error: err
				});
			} else {
				response.json(result);
			}
		});
};

exports.uncomment = (request, response) => {
	let comment = request.body.comment;

	SONG.findByIdAndUpdate(request.body.songId, { $pull: { comments: { id: comment._id } } }, { new: true })
		.populate('comments.posstedBy', '_id name')
		.populate('posstedBy', '_id name')
		.exec((err, result) => {
			if (err) {
				return response.json({
					error: err
				});
			} else {
				response.json(result);
			}
		});
};
