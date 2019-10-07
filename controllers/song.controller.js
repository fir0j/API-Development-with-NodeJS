const songSchema = require('../models/song.model');

exports.postSong = (request, response) => {
	const song = new songSchema(request.body);
	console.log('Posting a song:', request.body);
	song
		.save()
		.then((songs) => response.json({ message: 'success' }))
		.catch((err) => response.json({ message: 'unable to post song' }));
};

exports.getSong = (request, response) => {
	let song = songSchema;
	song
		.find()
		.then((songs) => response.json(songs))
		.catch((err) => response.json({ message: 'failed to fetch songs' }));
	// .populate('postedBy', '_id name')
	// .populate('comment', 'comment createdOn')
	// .populate('comments, postedBy', '_id name');
};

exports.deleteSong = (request, response) => {
	let song = new Songs(request.body);
	song.deleteOne({}).then((err, result) => {
		if (err) return response.json({ message: 'unable to delete song' });
		response.json({ message: 'One document deleted' });
	});
};

// exports.comment = (request, response) => {
// 	let comment = request.body.comment;
// 	comment.postedBy = request.body.userId;

// 	Songs.findByIdAndUpdate(request.body.postId, { $push: { comments: comment } }, { new: true })
// 		.populate('comments.posstedBy', '_id name')
// 		.populate('posstedBy', '_id name')
// 		.exec((err, result) => {
// 			if (err) {
// 				return response.json({
// 					error: err
// 				});
// 			} else {
// 				response.json(result);
// 			}
// 		});
// };

// exports.uncomment = (request, response) => {
// 	let comment = request.body.comment;

// 	Songs.findByIdAndUpdate(request.body.postId, { $pull: { comments: { id: comment._id } } }, { new: true })
// 		.populate('comments.posstedBy', '_id name')
// 		.populate('posstedBy', '_id name')
// 		.exec((err, result) => {
// 			if (err) {
// 				return response.json({
// 					error: err
// 				});
// 			} else {
// 				response.json(result);
// 			}
// 		});
// };
