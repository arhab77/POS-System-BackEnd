const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('../controller/product');
const { police_check } = require('../../middleware');

router.get('/product',productController.index);
router.post('/product', 
    multer({dest: os.tmpdir()}).single('image'),
    police_check('create', 'Product'),
    productController.store);
router.put('/product/:id',
    multer({dest: os.tmpdir()}).single('image'), 
    police_check('update', 'Product'),
    productController.update);
router.delete('/product/:id', 
    police_check('delete', 'Product'),
    productController.destroy);

module.exports = router;