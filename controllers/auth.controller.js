const USER = require('../models/user.model');

exports.signup = async (request, response) => {
	const userExists = await USER.findOne({ email: request.body.email });
	if (userExists)
		return response.status(403).json({
			error: 'The email is already taken!'
		});

	const user = await new USER(request.body);
	await user.save();
	response.status(200).json({ message: 'signup success ! please login' });
};

/*
here making function asynchronous because operation inside this function may take time but we don't want 
our user to get stuck or browser to hang until those operation completes.
*/
