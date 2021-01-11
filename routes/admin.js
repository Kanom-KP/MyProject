const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

const admins = require('../controllers/admins');
const { checkAdmin, isLoggedIn } = require('../middleware')
const multer = require('multer');
const {storage} = require ('../cloudinary');
const upload = multer({ storage });

const Product = require('../models/product');
const User = require('../models/user');
const Address = require('../models/address');

// Admin routes begin with /admin

// Main Page / delete /add
router.route('/product/all') 
    .get(catchAsync(admins.allProduct))
    .delete(catchAsync(admins.deleteFromMainPage))
    .post (upload.array('img'),(catchAsync(admins.addProduct)));

// Product Detail
router.route('/product/:id')
    .get(catchAsync(admins.productDetail))
    .delete(catchAsync(admins.deleteFromDetailPage))
    .put(catchAsync(admins.updateProduct)); 

// Add new product
router.get('/addnew',(req,res) => {
    res.render('admin/add')
})


// Edit Product
router.get('/product/:id/edit', catchAsync(admins.editProduct));

router

// **********  |   |  __   ___  ,__  **********************************************
// **********  |   | |__  |___| |    **********************************************
// **********  |___|  __| |___  |    **********************************************

// All User
router.get('/user/all', catchAsync(admins.allUser));

// Delete User from main page
router.delete('/user/all', catchAsync(admins.deleteUserFromMainPage));

// User Detail
router.get('/user/:id', catchAsync(admins.userDetail)); 

// Delete User in User Detail page
router.delete('/user/:id', catchAsync(admins.deleteUserFromDetailPage)); 

// // Edit User
router.get('/user/:id/edit', catchAsync(admins.editUser));

router.put('/user/:id', catchAsync(admins.updateUser)) ;

module.exports = router;