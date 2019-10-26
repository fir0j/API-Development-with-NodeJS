exports.userValidator = (request, response, next) => {
	//handling error for firstName
	request.check('name', 'Write the First Name').notEmpty();
	request.check('name', 'First Name must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	//handling error for lastName
	request.check('email', 'Write the email').notEmpty();
	request.check('email', 'email must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	request.check('hashed_password', 'password').notEmpty();
	request.check('email', 'password must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
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
