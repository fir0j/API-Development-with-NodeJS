const USER = require('../models/user.model');

exports.userById = (request, response, next, id) => {
	USER.findById(id).exec((err, user) => {
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
	const user = new USER(request.body);
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
	USER.find().then((users) => response.json(users)).catch((err) => response.json(err));
};
