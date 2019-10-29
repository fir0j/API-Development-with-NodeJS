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
	createdOn: {
		type: Date,
		default: Date.now
	},
	updatedOn: Date,
	postedBy: {
		type: ObjectId,
		ref: 'USER'
	}
	// comments: [
	// 	{
	// 		comment: String,
	// 		postedBy: { type: ObjectId, ref: 'USER' },
	// 		createdOn: { type: Date, default: Date.now }
	// 	}
	// ],
	// photo: {
	// 	data: Buffer,
	// 	contentType: String
	// }
});

module.exports = mongoose.model('POST', postSchema);
