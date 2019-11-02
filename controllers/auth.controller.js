const USER = require('../models/user.model');
const _ = require('lodash');
const { sendEmail } = require('../helpers/index');
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

exports.requireSignin = expressJWT({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
	// Now when the user submit the token during sign in as authorization token, JWT is again able to decode that
	// same PAYLOAD using HEADER info and the same SECRETE KEY in the token and append it to the request body as auth key
	// which helps our API to keep track of signed in user.
});

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

		//passsing password as argument to one of the permanent methods in user schema
		if (!user.authenticate(password)) {
			return response.status(401).json({
				error: 'Email and password do not match'
			});
		}

		// return login token in two form: as cookie and as response. Anyone of them can be used for authentication
		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
		//JSONWEBTOKEN(JWT) encodes DEFAULT HEADER, OUR CUSTOM PAYLOAD(_id, role), OUR CUSTOM SECRETE_KEY into a token.
		response.cookie('loginToken', token, { expire: new Date() + 9999 });
		const { _id, email, name, role } = user;
		return response.json({ token, user: { _id, email, name, role } });
	});
};

exports.socialLogin = (req, res) => {
	// try signup by finding user with req.email
	let user = USER.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user) {
			// create a new user and login
			user = new USER(req.body);
			req.profile = user;
			user.save();
			// generate a token with user id and secret
			const token = jwt.sign({ _id: user._id, iss: 'NODEAPI' }, process.env.JWT_SECRET);
			res.cookie('t', token, { expire: new Date() + 9999 });
			// return response with user and token to frontend client
			const { _id, name, email } = user;
			return res.json({ token, user: { _id, name, email } });
		} else {
			// update existing user with new social info and login
			req.profile = user;
			user = _.extend(user, req.body);
			user.updated = Date.now();
			user.save();
			// generate a token with user id and secret
			const token = jwt.sign({ _id: user._id, iss: 'NODEAPI' }, process.env.JWT_SECRET);
			res.cookie('t', token, { expire: new Date() + 9999 });
			// return response with user and token to frontend client
			const { _id, name, email } = user;
			return res.json({ token, user: { _id, name, email } });
		}
	});
};

exports.signout = (request, response) => {
	response.clearCookie('loginToken');
	return response.json({ Message: 'signout successful' });
};

// add forgotPassword and resetPassword methods
exports.forgotPassword = (req, res) => {
	if (!req.body) return res.status(400).json({ message: 'No request body' });
	if (!req.body.email) return res.status(400).json({ message: 'No Email in request body' });

	console.log('forgot password finding user with that email');
	const { email } = req.body;
	console.log('signin req.body', email);
	// find the user based on email
	USER.findOne({ email }, (err, user) => {
		// if err or no user
		if (err || !user)
			return res.status('401').json({
				error: 'User with that email does not exist!'
			});

		// generate a token with user id and secret
		const token = jwt.sign({ _id: user._id, iss: 'NODEAPI' }, process.env.JWT_SECRET);

		// email data
		const emailData = {
			from: 'noreply@node-react.com',
			to: email,
			subject: 'Password Reset Instructions',
			text: `Please use the following link to reset your password: ${process.env
				.CLIENT_URL}/reset-password/${token}`,
			html: `<p>Please use the following link to reset your password:</p> <p>${process.env
				.CLIENT_URL}/reset-password/${token}</p>`
		};

		return user.updateOne({ resetPasswordLink: token }, (err, success) => {
			if (err) {
				return res.json({ message: err });
			} else {
				sendEmail(emailData);
				return res.status(200).json({
					message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
				});
			}
		});
	});
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
	const { resetPasswordLink, newPassword } = req.body;

	USER.findOne({ resetPasswordLink }, (err, user) => {
		// if err or no user
		if (err || !user)
			return res.status('401').json({
				error: 'Invalid Link!'
			});

		const updatedFields = {
			password: newPassword,
			resetPasswordLink: ''
		};

		user = _.extend(user, updatedFields);
		user.updated = Date.now();

		user.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err
				});
			}
			res.json({
				message: `Great! Now you can login with your new password.`
			});
		});
	});
};
