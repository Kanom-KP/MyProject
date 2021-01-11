const { fileLoader } = require('ejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const addressSchema = new Schema({
    name: String,
    fullname: String,
    phone: Number,
    detail: String,
    zipcode: Number,
    city: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Address", addressSchema);