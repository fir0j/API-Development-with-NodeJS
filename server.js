const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//running server on local machine
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running successfully on port: ${port}`);
});

//connecting the server to the database

mongoose
	.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database connected'));
mongoose.connection.on('error', (err) => {
	console.log(`Database Connection failed ! : ${err.message}`);
});

//bring in routes
const root = require('./routes/root.route');
const users = require('./routes/user.route');
const songs = require('./routes/song.route');

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());

//mounting routes using middleware
app.use('/', root);
app.use('/', users);
app.use('/', songs);
