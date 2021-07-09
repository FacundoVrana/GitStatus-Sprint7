const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const authAdmMiddleware = require('..//middlewares/authAdmMiddleware')
const controller = require('../controller/productController');
const productValidation = require('../middlewares/productValidate');

//Configuración de multer para archivo de producto
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/create',authMiddleware, controller.create);
//3. /products/:id (GET) Detalle de un producto particular
router.get('/:id', controller.detalleCrud);
//router.delete('/:id', authAdmMiddleware, controladorproduct.delete);

router.get('/cart', controller.cart)
router.get('/', controller.list);
router.get('/edit/:id', authMiddleware, controller.edit);

router.put('/edit/:id', upload.fields([{name: 'image'}, {name: 'image'}, {name: 'image'}]), authMiddleware, controller.update);

// router.post('/', upload.single('foto'), productValidate, controladorproduct.store);
router.post('/store', productValidation, upload.fields([{name: 'image'}, {name: 'image'}, {name: 'image'}]), controller.store);
router.delete('/delete/:id', controller.deleteProduct)

module.exports = router;