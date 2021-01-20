const localAuth = require('../auth-provider/passport');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require('morgan');
const express = require('express');
const app = express();

// routes handler
const home = require('../routes/home');
const auth = require('../routes/auth');

//development
app.use(morgan('dev'));
app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));

//express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//flash middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    next();
});

//template engine
app.set('view engine', 'ejs');


//routes point
app.use('/', home);
app.use('/auth', auth);



module.exports = app;