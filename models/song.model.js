const Mongoose = require('mongoose');
const { ObjectId } = Mongoose.Schema;
//considering one to one relationship between song and artist
//Also assuming one user can add only one comment to a song

const songsSchema = new Mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	Artist: {
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

module.exports = Mongoose.model('Songs', songsSchema);
