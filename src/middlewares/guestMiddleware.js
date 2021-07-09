function guestMiddleware(req, res, next) {
    //console.log(req.session);
    if (req.session.userLogged && req.session.userLogged.admin != 1) {
        return res.redirect('/profile');
    }
    next();
}

module.exports = guestMiddleware;