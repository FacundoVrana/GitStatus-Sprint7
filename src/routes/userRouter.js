const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

// Middlewares



const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userValidation = require ('../middlewares/userValidate');
const uploadFile = require('../middlewares/multerMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, controller.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), userValidation, controller.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, controller.login);

// Procesar de login
router.post('/login', controller.loginProcess);

// Perfil del usuario
router.get('/profile', authMiddleware, controller.profile);

//Logout
router.get('/logout', controller.logout);

//edición Profile
router.get ('/profile',authMiddleware, controller.edit);
router.put ('/profile', uploadFile.single('avatar'), controller.update)

module.exports = router;