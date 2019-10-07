const Mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/ZyperDB';
const Users = require('../models/user.model');

exports.getUsers = (request, response) => {
	var resultArray = [];
	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		if (err) {
			response.send('Error Connecting to the database');
		} else {
			console.log('Connection Successful');
			var cursor = db.collection('users').find();
			cursor.forEach(
				function(doc, err) {
					resultArray.push(doc);
				},
				function() {
					db.close();
					response.send(resultArray);
					console.log('Data sent Successfully');
				}
			);
		}
	});
};

exports.createUsers = (request, response) => {
	const user = new Users(request.body);
	console.log('Creating new user:', request.body);

	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		user.save().then((user) => {
			response.json({ user });
		});
	});
};

exports.comment = (request, response) => {
	let comment = request.body.comment;
	comment.postedBy = request.body.userId;
	Post.findByIdAndUpdate(request.body.songId, { $push: { comments: comment } }, { new: true })
		.populate('comments.postedby', '_id firstname')
		.populate('postedBy', '_id firstname')
		.exec((err, result) => {
			if (err) {
				return response.status(400).json({ error: err });
			} else {
				response.json(result);
			}
		});
};

// exports.uncomment = (request, response) => {
// 	comment.postedBy = request.body.userId;
// 	Post.findByIdAndUpdate(request.body.postId, { $pull: { comments: { _id: this.comment._id } } }, { new: true })
// 		.populate('comments.postedby', '_id firstname')
// 		.populate('postedBy', '_id firstname')
// 		.exec((err, result) => {
// 			if (err) {
// 				return response.status(400).json({ error: err });
// 			} else {
// 				response.json(result);
// 			}
// 		});
// };
