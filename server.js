const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//bring in routes
const root = require('./routes/root');
const users = require('./routes/users');

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//mounting routes using middleware
app.use('/', root);
app.use('/', users);

app.listen(3000, () => {
	console.log('Server is runnig successfully on port 3000');
});
