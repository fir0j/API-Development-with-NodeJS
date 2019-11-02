const USER = require('../models/user.model');
const _ = require('lodash');

exports.userById = (request, response, next, id) => {
	USER.findById(id).populate('following', '_id name').populate('followers', '_id name').exec((err, user) => {
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
	user
		.save()
		.then((result) => response.json({ message: 'user created successfully' }))
		.catch((err) => response.json({ message: 'unable to create new user' }));
};

exports.getAllUser = (request, response) => {
	USER.find()
		.select('name email created updated role')
		.then((users) => response.json(users))
		.catch((err) => response.json(err));
};

exports.hasAuthorization = (req, res, next) => {
	// providing authorization to the user on his profile only or to admin
	const sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
	const adminUser = req.profile && req.auth && req.auth.role == 'admin';
	const authorized = sameUser || adminUser;
	console.log('sameUser', sameUser, 'adminUser', adminUser);
	console.log('\n\nreq.profile', req.profile, '\n\n\nreq.auth', req.auth);
	if (!authorized) {
		return res.status(403).json({
			error: 'User is not authorized to perform this action'
		});
	}
	next();
};

exports.updateUserProfile = (req, res, next) => {
	let user = req.profile;
	user = _.extend(user, req.body); // extend(old objeject, new object) will mutate the old object with new object
	user.updatedOn = new Date();
	user
		.save()
		.then((result) => {
			result.salt = undefined;
			result.hashed_password = undefined;
			res.json(user);
		})
		.catch((err) => res.json(err));
};

exports.deleteUser = (req, res, next) => {
	let user = req.profile;
	user.remove().catch((err) => res.json(err)).then((result) => res.json({ message: 'user deleted successfully ' }));
};

// follow unfollow

exports.addFollowing = (req, res, next) => {
	USER.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } }, (err, result) => {
		if (err) {
			return res.json({ error: err });
		}
		next();
	});
};

exports.addFollower = (req, res) => {
	USER.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
		.populate('following', '_id name')
		.populate('followers', '_id name')
		.exec((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err
				});
			}
			result.hashed_password = undefined;
			result.salt = undefined;
			res.json(result);
		});
};

// remove follow unfollow

exports.removeFollowing = (req, res, next) => {
	USER.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId } }, (err, result) => {
		if (err) {
			return res.json({ error: err });
		}
		next();
	});
};

exports.removeFollower = (req, res) => {
	USER.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.body.userId } }, { new: true })
		.populate('following', '_id name')
		.populate('followers', '_id name')
		.exec((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err
				});
			}
			result.hashed_password = undefined;
			result.salt = undefined;
			res.json(result);
		});
};

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
