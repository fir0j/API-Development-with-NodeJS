const Mongoose = require('mongoose');
//considering one to one relationship between song and artist
//Also assuming one user can add only one comment to a song

const songsSchema = new Mongoose.Schema({
	title: {
		songName: String,
		required: 'Song Name is required'
	},
	Artist: {
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
		},
		isFamous: Boolean,
		required: 'Artist details are required'
	},
	album: {
		albumName: String,
		required: 'Artist Name is required'
	},
	genre: {
		genreName: String,
		required: 'genreName is required'
	},
	comments: [ { userID: String, comment: String } ]
});

module.exports = Mongoose.model('Songs', songsSchema);
