const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const expressValidator = require('express-validator');

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

app.listen(3000, () => {
	console.log('Server is runnig successfully on port 3000');
});
