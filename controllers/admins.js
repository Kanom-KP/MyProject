const Product = require('../models/product');
const User = require('../models/user');


module.exports.allProduct = async (req,res) => {
    const product = await Product.find({})
    res.render('admin/allproduct', { product })
};

module.exports.deleteProduct = async (req,res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    req.flash('success', 'Product deleted!');
    res.redirect('/admin/product/all')
};

module.exports.productDetail = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        req.flash('error', 'This product might be deleted or did not exist');
        return res.redirect('/admin/product/all')
    }
    res.render('admin/detail', { product });
};



module.exports.addProduct = async (req,res) => { 
    const newProduct = new Product(req.body.product);
    newProduct.img = req.files.map(f => ({url: f.path, filename: f.filename }))
    await newProduct.save();
    console.log(newProduct);
    req.flash('success', 'Successfully added a new product!')
    res.redirect(`/admin/product/${newProduct._id}`)
};

module.exports.editProduct = async(req,res) => {
    const product = await Product.findById(req.params.id)
    res.render('admin/edit', { product });
};

module.exports.updateProduct  = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product});
    req.flash('success', 'Successfully updated!')
    res.redirect(`/admin/product/${product._id}`)
};

// **********  |   |  __   ___  ,__  **********************************************
// **********  |   | |__  |___| |    **********************************************
// **********  |___|  __| |___  |     DATA **********************************************

module.exports.allUser = async (req,res) => {
    const user = await User.find({})
    res.render('admin/alluser', { user })
};

module.exports.deleteUser = async (req,res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    req.flash('success', 'User deleted!');
    res.redirect('/admin/user/all')
};

module.exports.userDetail = async (req, res) => {
    const user = await User.findById(req.params.id).populate('addresss');
    if(!user) {
        req.flash('error', 'This product might be deleted or did not exist');
        return res.redirect('/admin/user/all')
    }
    res.render('admin/userdetail', { user });
};

module.exports.editUser = async(req,res) => {
    const user = await User.findById(req.params.id)
    res.render('admin/edituser', { user });
};

module.exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {...req.body.user});
    req.flash('success', 'Successfully updated!')
    res.redirect(`/admin/user/${user._id}`)
};
