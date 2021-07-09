function admLoggedMiddleware(req, res, next) {

    res.locals.admLogged = false;

    if (req.session.userLogged && req.session.userLogged.admin == '1') {
     res.locals.admLogged = true;
 
     //Paso las variables para que esten disponibles en todas las vistas
     res.locals.userLogged = req.session.userLogged;
        
    }
     next();
 }
 
 module.exports = admLoggedMiddleware;