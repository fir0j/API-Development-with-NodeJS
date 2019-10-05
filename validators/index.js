exports.createUsersValidator = (request, response, next) => {
	//handling error for firstName
	request.check('firstName', 'Write the First Name').notEmpty();
	request.check('firstName', 'First Name must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	//handling error for lastName
	request.check('lastName', 'Write the Last Name').notEmpty();
	request.check('lastName', 'last Name must be between 4 to 150 characters').isLength({
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
