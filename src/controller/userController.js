const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
const {User, Image, Product} = require('../database/models');
const {
	validationResult
} = require('express-validator');

let usersController = {
    register: (req, res) => {
    return res.render ('register')
  },

    profile: async (req, res) => {
        console.log(req.session.userLogged);
        let user = await User.findByPk(req.session.userLogged.id)
        console.log(user);
        res.render ('profile', {user})
      },
      



    processRegister: async (req, res) => {
        const resulValidation = validationResult (req);
        console.log(req.body);
        if (resulValidation.errors.length > 0 ){
            return res.render ('register',{
            errors: resulValidation.mapped(),
            oldData: req.body,
        
    });
    }
   
        let user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            adress: req.body.adress,
            avatar: req.file ? req.file.filename :'avatar.jpg',
            password: bcryptjs.hashSync(req.body.password, 10)
        })
        !req.session.userLogged ? req.session.userLogged = user : "";
        
        res.redirect ('/profile')
       
},

login: (req, res) => {
    console.log('ingreso login');
    res.render('login')
}, 

loginProcess: async (req, res) => {
        
        let userToLogin = await User.findOne({
            where: {
                email : req.body.email
            }
        })
        console.log(userToLogin);
        if (userToLogin) {

            let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (isPasswordOk) {
                
                req.session.userLogged = userToLogin
                if(req.body.recordatorio){
                    res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60})
                    console.log('hay cookie');
                    //console.log(req.cookies.userEmail);
                }
                
                return res.redirect('/profile')
            }
            return res.render( "login", {
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas"
                    }
                }
            })
        }


         return res.render( "login", {
            errors: {
                email: {
                    msg: "No esta registrado este mail"
                }
            }
        })
    },
    edit: async (req, res)=> {
        let user = await User.findByPk(req.session.userLogged.id);
        res.render('profile', {user})
    },
    update: async (req, res)=> {

        let user = await User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            adress: req.body.adress,
            avatar: req.file ? req.file.filename :req.session.userLogged.avatar
           

        },
        {
            where: {id: req.session.userLogged.id}
        })
        res.redirect('/profile')
    },
    logout: (req, res) => {
        console.log("eNTRE EN LOGAOUT");
        req.session.destroy();
        return res.redirect('/');
    }



}



module.exports = usersController;