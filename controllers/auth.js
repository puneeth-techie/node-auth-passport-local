const passport = require('passport');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Users, validateUser } = require('../models/users');

exports.login = (req, res, next) => {
    res.render('login', {user: req.user});
}

exports.loginPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req, res, next);
}

exports.register = (req, res, next) => {
    res.render('register', {user: req.user});
}

exports.registerPost = (req, res, next) => {
    let { error } = validateUser(req.body);
    if(error){
        res.status(400).render('register', {error: error});
    }else{
        // let errors = [];
        Users.findOne({ email: req.body.email})
            .then(user => {
                if(user){
                    error = {
                        details: [{ message: "Email already exist."}]
                    }
                    res.status(400).render('register', {error: error})
                }else{
                    user = new Users(_.pick(req.body, ['name', 'email', 'password']));
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if(err) throw err;
                            user.password = hash;
                            user.save()
                                .then((user) => {
                                    req.flash('success_msg', "You are now registered. Please login.");
                                    res.status(200).redirect('/auth/login');
                                }).catch((err) => {
                                    throw err;
                                });
                        });
                    });
                }
            }).catch((err) => {
                throw err;
            });
    }
}

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.status(200).redirect('/auth/login');   
}