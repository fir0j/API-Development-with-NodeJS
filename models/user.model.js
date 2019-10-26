const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	email: {
		type: String,
		required: true,
		trim: true
	},
	hashed_password: {
		type: String,
		required: true,
		trim: true
	},
	salt: String,
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

/*

what is virtual field in mongodb ?
> virtual fields aret the field which only exist logically or at implementation level and don't get persisted/stored in the database or document's collection.

*/

// defining Virtual field called password which will still act as a part of USER schema.
userSchema
	.virtual('password')
	// the function below update the salt and hash_password of our schema dynamically
	.set(function(password) {
		// refering schema's fields using this keyword
		//creating temporary variable called _password to store plain password
		this._password = password;
		//generate random unique string or timestamp when password is recieved and updating real field called salt.
		this.salt = uuidv1();
		//encrypting the password which will be saved inside the database because hashed_password is real field.
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		//returning the incoming and unencrypted password
		return this._password;
	});

// defining methods for generating sha1 hash using same syntax as defining virtual field
userSchema.methods = {
	encryptPassword: function(password) {
		if (!password) return '';
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
		} catch (err) {
			return '';
		}
	}
};

module.exports = mongoose.model('USER', userSchema);

//By Default, mongoose uses plural form of name of the model and creates collection with that name if collection is specified.
//So above line will refer to the collection name called users
//however you can force mongoose to use your own name for the collection by below syntax
// module.exports = mongoose.model('USER', userSchema, 'usersCollection');
