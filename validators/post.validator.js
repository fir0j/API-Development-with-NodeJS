exports.postValidator = (request, response, next) => {
	//handling error for title
	request.check('title', 'Write the title Name').notEmpty();
	request.check('title', 'title must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	//handling error for body
	request.check('body', 'Write the body').notEmpty();
	request.check('body', 'body must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	//for checking object inside object
	// request.checkBody('artist.isFamous', "Write isFamous as 'true' or 'false' ").isBoolean();

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
