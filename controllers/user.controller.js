const USER = require('../models/user.model');
const _ = require('lodash');

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

exports.getUserById = (request, response) => {
	request.profile.salt = undefined;
	request.profile.hashed_password = undefined;
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
	USER.find()
		.select('name email created updated')
		.then((users) => response.json(users))
		.catch((err) => response.json(err));
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

exports.updateUserProfile = (req, res, next) => {
	let user = req.profile;
	user = _.extend(user, req.body); // extend(old objeject, new object) will mutate the old object with new object
	user.updatedOn = new Date();
	user.save((err) => {
		if (err) {
			return res.status(400).json({
				error: 'Your are not authorized to perform profile update'
			});
		}
		user.salt = undefined;
		user.hashed_password = undefined;
		res.json({ user });
	});
};

exports.deleteUser = (req, res, next) => {
	let user = req.profile;
	user.remove((err, user) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		user.hashed_password = undefined;
		user.salt = undefined;
		res.json({ Message: 'user deleted successfully' });
	});
};
