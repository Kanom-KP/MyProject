const mongoose = require('mongoose');
const Product = require('./models/product')
const Address = require('./models/address')

mongoose.connect('mongodb://localhost:27017/productdata', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

// const seedProduct = [
//     {
//         name: 'Happy Dog Mini Toscana 1kg',
//         brand: 'Happy Dog',
//         detail: 'Dog food for small dog up to 10kg.',
//         price: 350,
//         inStock: true,
//         tag: ['Dog', 'Food', 'Small Dog'],
//         img: '/productPic/dogp1.jpg'
//     },

//     { 
//         name: 'Happy Dog Mini Baby&Junior 1kg',
//         brand: 'Happy Dog',
//         detail: 'Dog food for puppy for healthy development',
//         price: 370,
//         inStock: true,
//         tag: ['Dog', 'Food', 'Puppy'],
//         img: '/productPic/dogp2.jpg'
//     },

//     {
//         name: 'NUTRA Gold microbites 3kg',
//         brand: 'NUTRA Gold',
//         detail: 'Microbites for small breed dogs up to 12kg.',
//         price: 630,
//         inStock: true,
//         tag: ['Dog', 'Food', 'Small Dog'],
//         img: '/productPic/dogp3.jpg'
//     },

//     {
//         name: 'Black Hawk (Salmon) 2.5kg',
//         brand: 'Black Hawk',
//         detail: 'Rich in omega oils for skin, joint, muscle and heart',
//         price: 840,
//         inStock: true,
//         tag: ['Dog', 'Food'],
//         img: '/productPic/dogp4.jpg'
//     },
// ]

// Product.insertMany(seedProduct)
// .then(res => {
//     console.log(res)
// })
// .catch(e => {
//     console.log(e)
// })

const seedAddress = [
    {
        name: 'House',
        fullname: 'Kanom PH',
        phone: 0831977018,
        detail: '1548/79 Elio',
        zipcode: 10900,
        city: 'BKK',
        owner: '5fdf8d1e2e13fd3bb8fa8738'
    }
];

Address.insert(seedAddress)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})