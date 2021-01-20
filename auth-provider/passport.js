const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({usernameField: 'email'},
    function(email, password, done) {
        Users.findOne({ email: email})
            .then(user => {
                if(!user){ return done(null, false, { message: 'The email is not registered.'}); }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            }).catch(err => {throw err});
    }
));