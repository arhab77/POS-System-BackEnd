const router = require('express').Router();
const invoiceController = require('../controller/invoice');

router.get('/invoice/:order_id', invoiceController.show);

module.exports = router;