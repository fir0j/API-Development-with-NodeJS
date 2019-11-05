const POST = require('../models/post.model');
const _ = require('lodash');
// const formidable = require('formidable');
// const fs = require('fs');

//populate method will only populate if SONG schema has a field call postedBy and it already contains id of documents of other schema
exports.postById = (request, response, next, id) => {
	POST.findById(id)
		.populate('postedBy', '_id name')
		.populate('comments', 'text created')
		.populate('comments.postedBy', '_id name role')
		.exec((err, post) => {
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
		.select('_id title body created likes')
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
	let sameUser = req.post && req.auth && req.post.postedBy._id == req.auth._id;
	let adminUser = req.post && req.auth && req.auth.role == 'admin';
	let isPoster = sameUser || adminUser;
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
	post.save().then((result) => res.json(result)).catch((err) => res.json(err));
};

exports.getAllPost = (request, response) => {
	POST.find()
		.populate('postedBy', '_id name')
		.populate('comments', 'text created')
		.populate('comments.postedBy', '_id name')
		.select('_id title body created likes')
		.sort({ created: -1 })
		.then((result) => response.json(result))
		.catch((err) => response.json(err));
};

exports.deletePost = (request, response, next) => {
	let post = request.post;
	console.log(post);
	post
		.deleteOne()
		.then((result) => response.json({ message: 'post deleted successfully' }))
		.catch((err) => response.json({ message: 'failed to delete post' }));
	next();
};

exports.updatePost = (req, res) => {
	let post = req.post;
	post = _.extend(post, req.body); // extend(old objeject, new object) will mutate the old object with new object
	post.updatedOn = Date.now();
	post.save().then((result) => res.json(post)).catch((err) => res.json(err));
	next();
};

exports.like = (req, res) => {
	POST.findByIdAndUpdate(
		req.body.userId,
		{ $push: { likes: req.body.userId } },
		{ new: true }
	).exec((err, result) => {
		if (err) {
			return res.json({ error: err });
		}
		res.json(result);
	});
};

exports.unlike = (req, res) => {
	POST.findByIdAndUpdate(
		req.body.userId,
		{ $push: { likes: req.body.userId } },
		{ new: true }
	).exec((err, result) => {
		if (err) {
			return res.json({ error: err });
		}
		res.json(result);
	});
};

exports.comment = (request, response) => {
	let comment = request.body.comments;
	comment.postedBy = request.body.userId;
	// request.body.userId is pointing to the id of the logged in user

	POST.findByIdAndUpdate(request.body.postId, { $push: { comments: comment } }, { new: true })
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
	let comment = request.body.comments;

	POST.findByIdAndUpdate(request.body.postId, { $pull: { comments: { _id: comment._id } } }, { new: true })
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
