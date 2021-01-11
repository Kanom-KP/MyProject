const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');


const Product = require('../models/product');
const Review = require('../models/review');
const User = require('../models/user');
const Address = require('../models/address');
const { isLoggedin } = require('../middleware')

const users = require('../controllers/users');
const user = require('../models/user');

// User routes begin with /user

// User Detail
router.get('/profile/:id', catchAsync(users.userProfile)); 

router.get('/:id/cart', catchAsync(users.shoppingCart));


// // Edit User
// router.get('/profile/:id/edit', isLoggedin, catchAsync(users.editProfile));

// router.put('/profile/:id', isLoggedin, catchAsync(users.updateProfile));

// // Add Address
router.post('/profile/:id/addresses', 
    catchAsync(users.newAddress));

// // Delete Address
router.delete('/profile/:id/address/:addressId', 
    catchAsync(users.deleteAddress));

module.exports = router;