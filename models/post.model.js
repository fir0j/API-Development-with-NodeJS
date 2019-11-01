const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	postedBy: {
		type: ObjectId,
		ref: 'USER'
	},
	likes: [
		{
			type: ObjectId,
			ref: 'USER'
		}
	],
	comments: [
		{
			text: String,
			postedBy: { type: ObjectId, ref: 'USER' },
			createdOn: { type: Date, default: Date.now }
		}
	],
	createdOn: {
		type: Date,
		default: Date.now
	},
	updatedOn: Date

	// photo: {
	// 	data: Buffer,
	// 	contentType: String
	// }
});

module.exports = mongoose.model('POST', postSchema);
