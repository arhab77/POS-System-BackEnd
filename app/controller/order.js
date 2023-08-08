const { Types } = require('mongoose');
const CartItem = require('../model/cartItem');
const DeliveryAddress = require('../model/deliveryAddress');
const Order = require('../model/order');
const OrderItem = require('../model/orderItem');

const store = async(req, res, next) => {
    try {
        let {delivery_fee, delivery_address} = req.body;
        let items = await CartItem.find({user: req.user._id}).populate('Product');
        if(!items){
            return res.json({
                error: 1,
                message: `You're not create order because you not have items in cart`
            });
        }
        let address = await DeliveryAddress.findById(delivery_address);
        let order = new Order({
            _id: new Types.ObjectId(),
            status: 'waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail,
            },
            user: req.user._id
        });
        let orderItems = await OrderItem.inseryMany(items.map(item => ({
            ...item,
            name: item.product.name,
            qty: parseInt(item.qty),
            price: parseInt(item.product.price),
            order: order._id,
            product: item.product._id
        })));
        orderItems.forEach(item => order.order_items.push(item));
        order.save();
        await CartItem.deleteMany({user: req.user._id});
        return res.json(order);

    } catch (err) {
        if(err && err.name === 'validatorError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }

        next(err);
    }
}

const index = async(req, res, next) => {
    try {
        let {skip = 0, limit = 10} = req.query;
        let count = await Order.find({user: req.user._id}).countDocuments();

        let order = await Order
        .find({user: req.user._id})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('order_items')
        .sort('-createdAt');
        return res.json({
            data: order.map(order => order.toJSON({virtuals: true})),
            count
        });

    } catch (err) {
        if(err && err.name === 'validatorError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }

        next(err);
    }
}

module.exports = {
    index,
    store
}