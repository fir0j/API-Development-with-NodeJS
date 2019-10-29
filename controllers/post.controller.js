const POST = require('../models/post.model');
const _ = require('lodash');
// const formidable = require('formidable');
// const fs = require('fs');

//populate method will only populate if SONG schema has a field call postedBy and it already contains id of documents of other schema
exports.postById = (request, response, next, id) => {
	POST.findById(id).populate('postedBy', '_id name').exec((err, post) => {
		if (err || !post) {
			return response.status(400).json({
				error: 'post not found'
			});
		}
		request.post = post;
		next();
	});
};

exports.postByUser = (request, response) => {
	POST.find({ postedBy: request.profile._id })
		.populate('postedBy', '_id name')
		.sort('_created')
		.exec((err, posts) => {
			if (err) {
				return response.status(400).json({
					error: err
				});
			}
			response.json(posts);
		});
};

exports.isPoster = (req, res, next) => {
	let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
	if (!isPoster) {
		return res.status(403).json({
			error: 'User is not authorized'
		});
	}
	next();
};

exports.getPostById = (request, response) => {
	return response.json(request.post);
};

exports.createPost = (req, res) => {
	let post = new POST(req.body);
	req.profile.salt = undefined;
	req.profile.hashed_password = undefined;
	post.postedBy = req.profile;
	post.save((err, result) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}

		res.json(result);
	});
};

exports.getAllPost = (request, response) => {
	POST.find()
		.populate('postedBy', '_id name')
		.then((posts) => response.json(posts))
		.catch((err) => response.json({ message: 'failed to fetch posts' }));
};

exports.deletePost = (request, response) => {
	let post = request.post;
	console.log(post);
	post
		.deleteOne()
		.then((result) => response.json({ message: 'post deleted successfully' }))
		.catch((err) => response.json({ message: 'failed to delete post' }));
};

exports.updatePost = (req, res, next) => {
	let post = req.post;
	post = _.extend(post, req.body); // extend(old objeject, new object) will mutate the old object with new object
	console.log(post);
	post.updatedOn = Date.now();
	post.save((err) => {
		if (err) {
			return res.status(400).json({
				error: 'Your are not authorized to perform profile update'
			});
		}
		res.json(post);
		next();
	});
};

exports.comment = (request, response) => {
	let comment = request.body.comment;
	comment.postedBy = request.body.userId;
	//where does request.body.userId pointing to?

	SONG.findByIdAndUpdate(request.body.postId, { $push: { comments: comment } }, { new: true })
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

	POST.findByIdAndUpdate(request.body.postId, { $pull: { comments: { id: comment._id } } }, { new: true })
		.populate('comments.postedBy', '_id name')
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

// exports.createPost2 = (request, response, next) => {
// 	let form = new formidable.IncomingForm();
// 	form.keepExtensions = true;
// 	form.parse(request, (err, fields, files) => {
// 		if (err) {
// 			return response.status(400).json({
// 				error: 'Image could not be uploaded'
// 			});
// 		}

// 		let post = new POST(fields);
// 		console.log(request.profile);
// 		request.profile.salt = undefined;
// 		request.profile.hashed_password = undefined;
// 		post.postById = request.profile;
// 		if (files.photo) {
// 			post.photo.data = fs.readFileSync(files.photo.path);
// 			post.photo.contentType = files.photo.type;
// 		}

// 		post.save((err, result) => {
// 			if (err) {
// 				return response.status(400).json({
// 					error: err
// 				});
// 			}

// 			response.json(result);
// 			next();
// 		});
// 	});
// 	// let post = new POST(request.body);
// 	// post
// 	// 	.save()
// 	// 	.then((result) => response.json({ message: 'post created successfully' }))
// 	// 	.catch((err) => response.json({ message: 'unable to create post' }));
// };
