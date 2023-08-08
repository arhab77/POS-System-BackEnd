const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const {AutoIncrementID} = require('@typegoose/auto-increment');
const bcrypt = require('bcrypt');

let userSchema = Schema({
    full_name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        minlength:[3, 'Panjang nama harus antara 3 - 255 karakter'],
        maxlength:[255, 'Panjang nama harus antara 3 - 255 karakter']
    },

    customer_id:{
        type: Number
    },

    email:{
        type: String,
        required: [true, 'Email harus diisi'],
        maxlength: [255, 'Panjang email maksimal 255 karakter']
    },

    password:{
        type: String,
        required: [true, 'Password harus diisi'],
        maxlength: [255, 'Panjang email maksimal 255 karakter']
    },

    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: [String]
},{timestamps: true});

userSchema.path('email').validate(function (value) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(value);
}, attr => `${attr.email} Harus merupakan email yang valid`);

userSchema.path('email').validate(async function(value) {
    try {
        //lakukan pencarian ke _collection_ User berdasarkan 'email'
        const count = await this.model('User').count({email: value});

        //kode ini mengindikasikan bahwa jika user ditemukan akan mengembalikan 'false' jika tidak ditemukan akan mengembalikan 'true'
        //jika 'false' maka validasi gagal
        //jika 'true' maka validasi berhasil
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);


//hash password agar tidak terlihat
const HASH_ROUND = 10;
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
});

//Auto increment pada field costumer_id
userSchema.plugin(AutoIncrementID, {field: 'customer_id', startAt: 1});

module.exports = model('User', userSchema);