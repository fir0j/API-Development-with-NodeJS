const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const expressValidator = require('express-validator');
const fs = require('fs');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//running server on local machine
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running successfully on port: ${port}`);
});

mongoose
	.connect(process.env.LOCAL_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database connected'));
mongoose.connection.on('error', (err) => {
	console.log(`Database Connection failed ! : ${err.message}`);
});

//bring in routes
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const authRoutes = require('./routes/auth.route');

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());
app.use(morgan('dev'));

//mounting routes using middleware
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', authRoutes);
app.get('/', (req, res) => {
	fs.readFile('docs/APIEndPointsDoc.json', (err, data) => {
		if (err) {
			res.status(400).json({
				error: err
			});
		}
		const docs = JSON.parse(data);
		res.json(docs);
	});
});
// this is custom middleware and should be placed below authRoutes so that it will only execute after auth err encountered
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: 'Unauthorized ! please submit correct signinToken' });
	}
});
