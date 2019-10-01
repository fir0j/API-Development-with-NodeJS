const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/ZyperDB';
app.get('/', (request, response) => {
	response.send('server is running on port 3000');
});

app.get('/users', (request, response) => {
	var resultArray = [];
	Mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) {
			response.send('Error Connecting to the database');
		} else {
			console.log('Connection Successful');
			// var db = client.db('ZyperDB');
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
});

app.post('/insert', (request, response) => {
	var item = {
		title: request.body.title,
		content: request.body.content,
		author: request.body.author
	};

	Mongoose.connect(url, function(err, db) {
		db.collection('users').insertOne(item, function(err, result) {
			console.log('Item inserted');
			db.close();
		});
	});
});

app.listen(3000, () => {
	console.log('app running on port 3000');
});
