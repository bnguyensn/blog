// Set up process.env
const dotenv = require('dotenv').config();

// Express server
const express = require('express');

// Utilities
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');  // Needed to access POST requests' data

// Security
const helmet = require('helmet');  // Production security package

// Features

/**
 * ROUTER MODULES =========
 * Each router module corresponds to a host in our domain
 * Also known as middleware functions
 * */

const index = require('./server/routes/index');

/**
 * EXPRESS APPLICATION ==========
 * */

// Create the Express server
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /src
//app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));

// Set up port
app.set('port', process.env.PORT || 63345);

// Set up features

/**
 * LOAD MIDDLEWARES ==========
 * */

// Default middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(process.env.DB_JWT_SECRET));

// Production security
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        // defaultSrc: ['https:'],  // This won't work for local builds
        scriptSrc: ["'self'"],
        styleSrc: ["'unsafe-inline'", "'self'", 'https://fonts.googleapis.com'],
        objectSrc: ["'none'"],
        reportUri: 'https://cspreport.bnguyensn.com'
    }
}));

// The first middleware
app.use((req, res, next) => {
    //console.log(`Received ${req.method} request`);
    next();
});

// The folder where generated production client files are
app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: 31536000
}));

// Finally, after loading the router modules above, we attach website paths to them
// This is just like loading another middleware
app.use('/', index);

/**
 * ERROR HANDLING ==========
 * */

const errors = require('./server/routes/errors');

app.use(errors);

/**
 * START THE APPLICATION ==========
 * */

app.listen(app.get('port'), () => {
    console.log(`app live on port ${app.get('port')}`)
});

module.exports = app;