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
mongoose
	.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database connected'));
mongoose.connection.on('error', (err) => {
	console.log(`Database Connection failed ! : ${err.message}`);
});

//bring in routes
const rootRoutes = require('./routes/root.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const authRoutes = require('./routes/auth.route');

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());

//mounting routes using middleware
app.use('/', rootRoutes);
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', authRoutes);
