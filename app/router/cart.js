const router = require('express').Router();
const { police_check } = require('../../middleware');
const cartController = require('../controller/cart');

router.put('/cart', 
    police_check('update', 'Cart'),
    cartController.update
);
router.get('/cart',
    police_check('read', 'Cart'),
    cartController.index
);

module.exports = router;