const mongoose = require('mongoose');
const address = require('./address');
const cart = require('./cart');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addresses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    
carts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
]

});


UserSchema.plugin(passportLocalMongoose)

UserSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await address.remove({
            _id: {
                $in: doc.addresses  
            }
            })
    }
    console.log(doc)
})

UserSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await cart.remove({
            _id: {
                $in: doc.carts 
            }
            })
    }
    console.log(doc)
})

module.exports = mongoose.model('User', UserSchema);