const { fileLoader } = require('ejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Product = require('./product');

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        },
    
    quantity: {
        type: Number
        },

    owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

});

module.exports = mongoose.model("Cart", cartSchema);