const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('USER', userSchema);

//By Default, mongoose uses plural form of name of the model and creates collection with that name if collection is specified.
//So above line will refer to the collection name called users
//however you can force mongoose to use your own name for the collection by below syntax
// module.exports = mongoose.model('USER', userSchema, 'usersCollection');
