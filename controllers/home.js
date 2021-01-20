exports.home = (req, res, next) => {
    const user = req.user;
    res.render('home', {user: req.user});
}

exports.dashboard = (req, res, next) => {
    const user = req.user;
    res.render('dashboard', {user: user});
}