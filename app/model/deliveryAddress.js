const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const deliveryAddressSchema = Schema({
    name: {
        type: String,
        maxLength: [20, 'panjang nama deliveryAddress maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    },
    kelurahan: {
        type: String,
        maxLength: [20, 'panjang nama deliveryAddress maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    },
    kecamatan: {
        type: String,
        maxLength: [20, 'panjang nama deliveryAddress maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    },
    kabupaten: {
        type: String,
        maxLength: [20, 'panjang nama deliveryAddress maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    },
    provinsi: {
        type: String,
        maxLength: [20, 'panjang nama deliveryAddress maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    },
    detail: {
        type: String,
        maxLength: [20, 'panjang nama deliveryAddress maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = model('DeliveryAddress', deliveryAddressSchema);