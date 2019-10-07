const Mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/ZyperDB';
const Songs = require('../models/song.model');

exports.postSong = (request, response) => {
	const song = new Songs(request.body);
	console.log('Posting a song:', request.body);

	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		song.save((err, song) => {
			if (err) {
				return response.json(err);
			}
			response.json(song);
		});
	});
};

exports.getSong = (request, response) => {
	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		songsArray = [];
		if (err) {
			response.send('Error Connecting to the database');
		} else {
			console.log('Connection Successful');
			var cursor = db.collection('songs').find();
			// .populate('postedBy', '_id name')
			// .populate('comment', 'comment createdOn')
			// .populate('comments, postedBy', '_id name');
			cursor.forEach(
				function(doc, err) {
					songsArray.push(doc);
				},
				function() {
					db.close();
					response.send(songsArray);
				}
			);
		}
	});
};

exports.deleteSong = (request, response) => {
	var songsArray = [];
	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		if (err) {
			response.send('Error Connecting to the database');
		} else {
			var cursor = db.collection('songs').deleteOne({});
			response.json({ result: 'One document deleted' });
			// function() {
			// 	db.close();
			// 	response.send(songsArray);
			// 	console.log('Data sent Successfully');
			// }
		}
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
