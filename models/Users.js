const Mongoose = require('mongoose');

const usersSchema = new Mongoose.Schema({
	firstName: {
		type: String,
		required: 'First Name is required',
		minlength: 4,
		maxlength: 150
	},

	lastName: {
		type: String,
		required: 'Last Name is required',
		minlength: 4,
		maxlength: 150
	}
});

module.exports = Mongoose.model('Users', usersSchema);
