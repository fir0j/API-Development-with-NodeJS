const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Users', usersSchema);
