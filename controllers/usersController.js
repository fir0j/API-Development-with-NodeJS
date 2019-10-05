const Mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/ZyperDB';
const Users = require('../models/Users');

exports.getUsers = (request, response) => {
	var resultArray = [];
	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		if (err) {
			response.send('Error Connecting to the database');
		} else {
			console.log('Connection Successful');
			var cursor = db.collection('users').find();
			cursor.forEach(
				function(doc, err) {
					resultArray.push(doc);
				},
				function() {
					db.close();
					response.send(resultArray);
					console.log('Data sent Successfully');
				}
			);
		}
	});
};

exports.createUsers = (request, response) => {
	const user = new Users(request.body);
	console.log('Creating new user:', request.body);

	Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		user.save((err, result) => {
			if (err) {
				return response.status(400).json({
					error: err
				});
			}

			response.status(200).json({
				user: result
			});
		});
	});
};

/*
Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
	db.collection('users').insertOne(user, function(err, result) {
		console.log('Item inserted');
		db.close();
	});

*/
