const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Category,  Image, Product, Users} = require('../database/models');
const {	validationResult } = require('express-validator');
const imageController = require('./imageController');


let productController = {
    list: (req, res) => {
        db.Product.findAll(
            {include:['category', 'user', 'images']}
            
        )
        .then(productos => {
            return res.render('/', {productos})})
           
       },
    cart: (req, res) => {
        res.render('cart');
    },
    create: (req, res) => {
        res.render('createProd')
    },
    store: async (req, res) => {
        const validations = validationResult(req);
        if (validations.errors.length > 0) {
             return res.render ('createProd',{
                errors: validations.mapped(),
                oldData: req.body,
            });
        }

;

        let newProduct = await Product.create({
      
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            brand: req.body.brand,
            categories_id: req.body.category
        });


        let imagesFiles = [];
        let nameImage = '';
        for (let i = 0; i < 3; i++) {
            if (i==0) nameImage = req.files.image[0] ? req.files.image[0].filename : '.jpg';
            if (i==1) nameImage = req.files.image[0] ? req.files.image[0].filename : '.jpg';
            if (i==2) nameImage = req.files.image[0] ? req.files.image[0].filename : '.jpg';
            imagesFiles.push({
                name: nameImage
            })
        }

        let images = imageController.bulkCreate(newProduct.id, imagesFiles);
        
        let user = req.session.userLogged;
        let producto = await Product.findByPk(newProduct.id, 
            {include:['images', 'category']});
        res.render('productDesc', {producto});
   
    },     
    detalleCrud: async (req, res) => {
        let producto = await Product.findByPk(req.params.id, 
            {include:['images', 'category']});

        let user = req.session.userLogged;
        
        if (producto) {
            res.render('productDesc', {producto});
        } else {
            res.render('error404');
        }
    },
    edit: async (req, res) => {
        let productId = req.params.id;
        let product = await Product.findByPk(productId, {include: ['images']});


        if ( product ) {
            res.render('editProd', {product});
        }

    },
    update: async (req,res) => {
        let productId = req.params.id;

        console.log('--------------------------------------------');
        console.log(req.body);
        console.log('--------------------------------------------');

        let productUpdated = await Product.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            brand: req.body.brand,
            categories_id: req.body.category
        },{
            where: {id: productId}
        });

        //Edición de las imágenes
        let imagesFiles = [];
        // console.log(req.files);
        // console.log("--------------------Antes de leer files---------------------------")
        if (req.files.image) imagesFiles.push({image_name: req.files.image[0].filename, image_num:1})
        //if (req.files.image) imagesFiles.push({image_name: req.files.image[0].filename, image_num:2})
        //if (req.files.image) imagesFiles.push({image_name: req.files.image[0].filename, image_num:3})
        // console.log(imagesFiles);
        // console.log("--------------------Voy a bulkEdit--------------------------------")
        // console.log(await imageController.bulkEdit(propertyId, imagesFiles));
        let imagesNew = await imageController.bulkEdit(productId, imagesFiles);

        let user = req.session.userLogged;
        let producto = await Product.findByPk(productId, 
            {include:['images']});
        if (producto) {
          res.render('productDesc', {producto});  
        }
        
        
    },
    deleteProduct: async (req, res) => {

        let deletedProduct = await Product.destroy({where: {id : req.params.id}});
      
        res.redirect('/')
    }

    
}


module.exports = productController;