const { Op } = require("sequelize");
const db = require('../database/models');
const sequelize = db.sequelize;

let homeController = {
    index: async (req, res) =>{
        try{ 
            let products = await db.Product.findAll({
                include: [
                   "images"
                ]
            });

            console.log(products);
            return res.render('home', {products});
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = homeController;