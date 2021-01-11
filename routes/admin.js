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

// **********   __   __   __  __         __ ___  **********************************************
// **********  |__| |__| |  | |  \ |  | |    |   **********************************************
// **********  |    | \  |__| |__/ |__| |__  |   DATA, ADD, EDIT, DELETE***********************

// Product data table / delete product 
router.route('/product/all') 
    .get(catchAsync(admins.allProduct)) 

// Product Detail / delete product / edit existing product
router.route('/product/:id')
    .get(catchAsync(admins.productDetail))
    .delete(catchAsync(admins.deleteProduct))
    .put(catchAsync(admins.updateProduct)); 

// Add new product
router.get('/addnew',(req,res) => { res.render('admin/add')});
router.route('/addnew')
    .post (upload.array('img'),(catchAsync(admins.addProduct)));


// Edit Product
router.get('/product/:id/edit', catchAsync(admins.editProduct));

router

// **********  |   |  __   ___  ,__  **********************************************
// **********  |   | |__  |___| |    **********************************************
// **********  |___|  __| |___  |    DATA, EDIT, DELETE****************************

// All User data table
router.get('/user/all', catchAsync(admins.allUser));

// User Detail
router.get('/user/:id', catchAsync(admins.userDetail)); 

// Delete User 
router.delete('/user/:id', catchAsync(admins.deleteUser)); 

// Edit User
router.get('/user/:id/edit', catchAsync(admins.editUser));

router.put('/user/:id', catchAsync(admins.updateUser)) ;

module.exports = router;