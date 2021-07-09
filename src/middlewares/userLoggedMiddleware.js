function userLoggedMiddleware(req, res, next) {

   res.locals.isLogged = false;
   //console.log("locals 1: " + res.locals.isLogged);
   if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;

    //Paso las variables para que esten disponibles en todas las vistas
    res.locals.userLogged = req.session.userLogged;
   
   console.log("userLogged: " + res.locals.userLogged.id);
       
   }
   next();
}

module.exports = userLoggedMiddleware;