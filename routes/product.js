const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

const products = require('../controllers/products');

const Product = require('../models/product');
const Review = require('../models/review');
const User = require('../models/user');

const { isLoggedIn } = require('../middleware')

//  product routes begin with /product

// Register

// all product
router.get('/all', 
    catchAsync(products.allProducts));

// Product Detail
router.get('/:id', 
    catchAsync(products.productDetail));

// Add Review
router.post('/:id/reviews', 
    isLoggedIn, 
    catchAsync(products.newReview));

// Delete Review
router.delete('/:id/reviews/:reviewId', 
    isLoggedIn, 
    catchAsync(products.deleteReview))





module.exports = router;