const { fileLoader } = require('ejs');
const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name: {
        type: String,
        require: true
    },

    brand: {
        type: String,
        require: true
    },

    detail: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    tag: {
        type: [String],
        require: true
    },

    isAvailable: {
        type: Boolean,
        default: false
    },

    qty: {
        type: Number,
        default: 0
    },


    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],

    img: [{ 
        url: String,
        filename: String
    }]
});

ProductSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await review.remove({
            _id: {
                $in: doc.reviews  
            }
            })
    }
    console.log(doc)
})

module.exports = mongoose.model('Product', ProductSchema);