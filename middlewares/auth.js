module.exports = {
    authCheck: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Please login using your account.');
        res.status(400).redirect('/auth/login');
    }
}