const express = require('express');
const app = express();
const db = require('./config/db');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const uploadRouter = require('./routes/uploadRoute');
const badRequestError = require('./middleware/errorHandle');

const PORT = process.env.PORT;

// MIDDLEWARE FOR VIEW ENGINE SETTINGS
app.set('view engine', 'ejs');
// MIDDLEWARE FOR STATIC FILES
app.use(express.static('public'));
// MIDDLEWARE PARSER FOR JSON DATA
app.use(express.json());
// MIDDLEWARE PARSER FOR ENCODED URL DATA 
app.use(express.urlencoded({extended: true}));
// MIDDLEWARE LOGGER FOR DEV
app.use(morgan('dev'));
// COOKIE PARSER
app.use(cookieParser());
// API ROUTES
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/upload', uploadRouter);
// ERROR HANDLER MIDDLEWARE
app.use(badRequestError);

db().then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
.catch((error)=> console.log(error));