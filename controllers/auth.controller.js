const USER = require('../models/user.model');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();

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

exports.signin = (request, response) => {
	/*
	1. find the user based on email
	2. if error or no user
	3. if user found with correct email and password, authenticate
	4. generate a token with user id and secret
	5. persist the token as 't' in cookie with expiry date
	6. return reponse with user and token to frontend client
	*/

	const { email, password } = request.body;
	USER.findOne({ email }, (err, user) => {
		if (err || !user) {
			return response.status(401).json({
				error: 'User with this email does not exist. please sign up !'
			});
		}

		if (!user.authenticate(password)) {
			return response.status(401).json({
				error: 'Email and password do not match'
			});
		}

		// return login token in two form: as cookie and as response. Anyone can be used for authentication
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		response.cookie('loginToken', token, { expire: new Date() + 9999 });
		const { _id, email, name } = user;
		return response.json({ token, user: { _id, email, name } });
	});
};

exports.signout = (request, response) => {
	response.clearCookie('loginToken');
	return response.json({ Message: 'signout successful' });
};

exports.requireSignin = expressJWT({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
	// if the token received is valid, express-jwt appends the verified user's id as an auth key to the request object.
});
