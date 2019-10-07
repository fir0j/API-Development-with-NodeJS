exports.songValidator = (request, response, next) => {
	//handling error for title
	request.check('title', 'Write the title Name').notEmpty();
	request.check('title', 'title must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	//handling error artist
	request.checkBody('artist.firstName', 'Write the artist first name').notEmpty();
	request.checkBody('artist.firstName', 'Artist first name must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});

	request.checkBody('artist.lastName', 'Write the artist last name').notEmpty();
	request.checkBody('artist.lastName', 'Artist last name must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});
	request.checkBody('artist.isFamous', "Write isFamous as 'true' or 'false' ").isBoolean();
	request.check('album', 'Write the album name ').notEmpty();
	request.check('album', 'album must be between 4 to 150 characters').isLength({
		min: 4,
		max: 150
	});
	request.check('genre', 'Write the genre name').notEmpty();
	request.check('genre', 'genre must be between 4 to 150 characters').isLength({
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
