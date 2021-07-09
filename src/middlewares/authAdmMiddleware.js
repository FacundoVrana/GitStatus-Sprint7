const {Product} = require('../database/models');

let authAdmMiddleware = {
    auth: async (req, res, next) => {
    let product = await Product.findByPk (req.params.id)
        
        if (!req.session.userLogged  || req.session.userLogged.id != product.user_id) {
        return res.redirect('/login');
    }

    next();
    }}
    
    module.exports = authAdmMiddleware.auth;