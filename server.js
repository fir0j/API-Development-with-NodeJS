const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const expressValidator = require('express-validator');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

//running server on local machine
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running successfully on port: ${port}`);
});

mongoose
	.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

/*
There are two drivers for connecting with mongodb database.
1) mongodb driver:
> It is a native driver to interact with mongodb which accepts mongodb shell command as it is.
> It cannot create Models or schema or relationship between data like in sql.
> It is faster than mongoose but if you use this you have to make your SOURCE CODE PUBLIC 
  because it is managed under Affero General Public License (AGPL) license.

2) mongoose driver:
> It has ability to create data models or schema at implementation level called schema abstraction 
  because the schema will not exist physically in the mongodb database.
> It is managed under MIT liscence so you can host your code in public domain without making it oper source.

*/
