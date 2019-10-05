const Mongoose = require('mongoose');

const usersSchema = new Mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	}
});

module.exports = Mongoose.model('Users', usersSchema);
