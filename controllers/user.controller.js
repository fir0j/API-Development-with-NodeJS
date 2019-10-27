const USER = require('../models/user.model');

exports.userById = (request, response, next, id) => {
	USER.findById(id).exec((err, user) => {
		if (err || !user) {
			return response.status(400).json({
				error: 'User not found'
			});
		}
		//adding a new property to the request object called profile containing user found by id
		request.profile = user;
		next();
	});
};

exports.getUser = (request, response) => {
	return response.json(request.profile);
};

exports.createUser = (request, response) => {
	const user = new USER(request.body);
	console.log('Creating new user:', request.body);
	user
		.save()
		.then((user) => response.json({ message: 'user created successfully' }))
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

exports.hasAuthorization = (req, res, next) => {
	// providing authorization to the user on his profile only
	const authorized = req.profile & req.auth & (req.profile._id === req.auth._id);
	if (!authorized) {
		return res.status(403).json({
			error: 'User is not authorized to perform this action'
		});
	}
};
