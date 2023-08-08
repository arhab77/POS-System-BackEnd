const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'panjang nama category minimal 3 karakter'],
        maxLength: [20, 'panjang nama category maximal 20 karakter'],
        required: [true, 'nama kategori harus diisi']
    }
});

module.exports = model('Category', categorySchema);