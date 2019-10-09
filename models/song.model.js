const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
//considering one to one relationship between song and artist
//Also assuming one user can add only one comment to a song

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	artist: {
		firstName: {
			type: String,
			required: true
		},

		lastName: {
			type: String,
			required: true
		},
		isFamous: {
			type: Boolean,
			required: true
		}
	},
	album: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	comments: [
		{
			comment: String,
			postedBy: { type: ObjectId, ref: 'Users' },
			createdOn: { type: Date, default: Date.now }
		}
	]
});

module.exports = mongoose.model('Songs', songSchema);
