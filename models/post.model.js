const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
//considering one to one relationship between song and artist
//Also assuming one user can add only one comment to a song

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	postedBy: { type: ObjectId, ref: 'USER' },
	comments: [
		{
			comment: String,
			postedBy: { type: ObjectId, ref: 'USER' },
			createdOn: { type: Date, default: Date.now }
		}
	]
});

module.exports = mongoose.model('POST', postSchema);
