exports.userValidator = (request, response, next) => {
	//validation for user's name
	request.check('name', 'Write the Name').notEmpty();
	request.check('name', 'Name must be between 4 to 64 characters').isLength({
		min: 4,
		max: 64
	});

	//validation for email
	request.check('email', 'Write the email').notEmpty();
	request.check('email', 'email must be between 4 to 64 characters').isLength({
		min: 4,
		max: 64
	});

	request.check('password', 'write the password').notEmpty();
	request.check('password', 'password must be between 4 to 64 characters').isLength({
		min: 4,
		max: 64
	});

	//check for Errors
	const errors = request.validationErrors();

	//show the first errors when an array of error encountered
	if (errors) {
		const firstError = errors.map((error) => error.msg)[0];
		return response.status(400).json({ error: firstError });
	}

	//proceed to next middleware
	next();
};

exports.signupValidator = (request, response, next) => {
	//validation  for Name
	request.check('name', 'Write the First Name').notEmpty();
	request.check('name', 'First Name must be between 4 to 32 characters').isLength({
		min: 4,
		max: 32
	});

	//validation for email
	request.check('email', 'Write the email').notEmpty();
	request
		.check('email', 'email must be between 4 to 64 characters')
		.matches(/.+@.+\..+/)
		.withMessage('Email must contain @')
		.isLength({
			min: 4,
			max: 64
		});

	// validation for password
	request.check('password', 'write a password').notEmpty();
	request
		.check('password', 'password must be between 4 to 64 characters')
		.isLength({
			min: 4,
			max: 64
		})
		.withMessage('password must be between 4 to 64 characters')
		.matches(/\d/)
		.withMessage('password must contain at least one digit');

	//check for Errors
	const errors = request.validationErrors();

	//show the first errors when an array of error encountered
	if (errors) {
		const firstError = errors.map((error) => error.msg)[0];
		return response.status(400).json({ error: firstError });
	}

	//proceed to next middleware
	next();
};
