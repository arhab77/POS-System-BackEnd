const router = require('express').Router();
const { police_check } = require('../../middleware');
const deliveryAddressController = require('../controller/deliveryAddress');

router.get('/delivery-address', 
    police_check('view', 'DeliveryAddress'),
    deliveryAddressController.index);
router.post('/delivery-address', 
    police_check('create', 'DeliveryAddress'),
    deliveryAddressController.store);
router.put('/delivery-address/:id', deliveryAddressController.update);
router.delete('/delivery-address/:id', deliveryAddressController.destroy);

module.exports = router;