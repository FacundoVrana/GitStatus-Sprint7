const path = require('path');
const {body} = require ('express-validator');
const {User} = require('../database/models');


const validations = [
    body('first_name').isLength({min:2}).withMessage('Elegir un nombre de 2 caracteres mínimo'),
    body('last_name').isLength({min:2}).withMessage('Elegir un apellido de 2 caracteres mínimo'),
    body('email').isEmail().withMessage('Debe ingresar un E-mail')
        .custom(async (value, {req}) =>{
            let existe = await User.findOne ({
                where: {
                    email : req.body.email
                }
            })
            if(existe){
                throw new Error ('Este email ya está registrado')
            } else{
                return true;
            }
            return true;
        }),
    body('password').isLength({min:8}).withMessage('Elegir una pasword de 8 caracteres mínimo'),
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.JPEG', '.jpg', '.png', '.gif'];
            if(file){
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                } else{
                    return true;
                }
            }
        return true;
    })
       
]
module.exports = validations;