const POST = require('../models/post.model');

//populate method will only populate if SONG schema has a field call postedBy and it already contains id of documents of other schema
exports.postById = (request, response, next, id) => {
	POST.findById(id).populate('postedBy').populate('comments.postedBy', 'firstName').exec((err, post) => {
		if (err || !post) {
			return response.status(400).json({
				error: 'post not found'
			});
		}
		request.post = post;
		console.log('populated postedBy field');
		next();
	});
};

exports.post = (request, response) => {
	return response.json(request.post);
};

exports.createPost = (request, response) => {
	let post = new POST(request.body);
	post
		.save()
		.then((result) => response.json({ message: 'post created successfully' }))
		.catch((err) => response.json({ message: 'unable to create post' }));
};

exports.allPost = (request, response) => {
	POST.find()
		.populate('comments.postedBy', '_id name')
		.then((posts) => response.json(posts))
		.catch((err) => response.json({ message: 'failed to fetch posts' }));
};

exports.deletePost = (request, response) => {
	let post = postSchema;
	post
		.deleteOne({})
		.then((result) => response.json({ message: 'post deleted successfully' }))
		.catch((err) => response.json({ message: 'failed to delete post' }));
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
