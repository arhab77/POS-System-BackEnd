const router = require('express').Router();
const {police_check} = require('../../middleware');
const orderController = require('../controller/order');

router.post('/order', police_check('create', 'Order'), orderController.store);
router.get('/order',police_check('view', 'Order'), orderController.index);

module.exports = router;