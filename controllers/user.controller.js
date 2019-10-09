const userSchema = require('../models/user.model');

exports.userById = (request, response, next, id) => {
	userSchema.findById(id).exec((err, user) => {
		if (err || !user) {
			return response.status(400).json({
				error: 'User not found'
			});
		}
		request.profile = user;
		next();
	});
};

exports.getUser = (request, response) => {
	return response.json(request.profile);
};

exports.postUser = (request, response) => {
	const user = new userSchema(request.body);
	console.log('Creating new user:', request.body);
	user
		.save()
		.then((user) => response.json({ message: 'success' }))
		.catch((err) => response.json({ message: 'unable to create new user' }));

	/*
	Approach 2:
	==========
	user.save().then((user, err) => {
		if(err) return response.json(err);
		return response.json(users)
	});
		
	Approach 3:
	==========
	user.save((user, err) => {
		if(err) return response.json(err);
		return response.json(users)
	});


	*/
};

exports.getAllUser = (request, response) => {
	const user = userSchema;
	user.find().then((users) => response.json(users)).catch((err) => response.json(err));
};

// exports.comment = (request, response) => {
// 	let comment = request.body.comment;
// 	const song = new Songs(request.body);
// 	comment.postedBy = request.body.userId;
// 	song
// 		.findByIdAndUpdate(request.body.songId, { $push: { comments: comment } }, { new: true })
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
