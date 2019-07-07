const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors       = require('cors');
const session    = require('express-session');
require('dotenv').config();
require('./db/db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL, // allowed address
  credentials: true, // allows session cookies to be sent
  optionsSuccessStatus: 200, // Future proof or something
}

app.use(cors(corsOptions));


app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}));


const authController       = require('./controllers/authController');
const connectionController = require('./controllers/connectionController');

app.use('/auth',       authController);
app.use('/connection', connectionController);


app.get('/', (req,res) => {
	res.send("test");
	});

app.listen(process.env.PORT || 9000, () => {
	console.log(`Server is listening on port ${process.env.PORT} or 9000`);
});
