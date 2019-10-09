const songSchema = require('../models/song.model');

exports.songById = (request, response, next, id) => {
	songSchema
		.findById(id)
		.populate('postedBy', '_id name')
		.populate('comments', 'comment created')
		.populate('comments.postedBy', '_id name')
		.exec((err, song) => {
			if (err || !song) {
				return response.status(400).json({
					error: 'Song not found'
				});
			}
			request.song = song;
			next();
		});
};

exports.postSong = (request, response) => {
	let song = new songSchema(request.body);
	song
		.save()
		.then((result) => response.json({ message: 'success' }))
		.catch((err) => response.json({ message: 'unable to post song' }));
};

exports.song = (request, response) => {
	return response.json(request.song);
};

exports.getAllSong = (request, response) => {
	let song = songSchema;
	song
		.find()
		.populate('postedBy', '_id name')
		.populate('comments', 'comment created')
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

	songSchema
		.findByIdAndUpdate(request.body.postId, { $push: { comments: comment } }, { new: true })
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

exports.uncomment = (request, response) => {
	let comment = request.body.comment;

	songSchema
		.findByIdAndUpdate(request.body.songId, { $pull: { comments: { id: comment._id } } }, { new: true })
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
