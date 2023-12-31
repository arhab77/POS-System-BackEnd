const CartItem = require('../model/cartItem')
const Product = require("../model/product");

const update = async(req, res, next) => {
    try {
        const {items} = req.body;
        const productsId = items.map(item => item.product._id);
        const products = await Product.find({_id: {$in: productsId}});
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item.product._id);
            return {
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        });

        await CartItem.deleteMany({user: req.user._id});
        await cartItems.bulkWrite(cartItems.map(item => {
            return {
                updateOne: {
                    filter: {
                        user: req.user._id,
                        product: item.product
                    },
                    update: item,
                    upsert: true
                }
            }
        }));

        return req.json(cartItems);

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
        let items = await CartItem.find({user: req.user._id}).populate('product');
        return res.json(items);
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
    update
}