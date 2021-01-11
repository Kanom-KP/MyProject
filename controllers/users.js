const Product = require('../models/product');
const Review = require('../models/review');
const User = require('../models/user');
const Address = require('../models/address');


module.exports.userProfile = async (req, res) => {
    const user = await User.findById(req.params.id).populate('addresses');
    res.render('userside/profile', { user });
};

module.exports.newAddress = async (req, res) => {
    const user = await User.findById(req.params.id);
    const address = new Address(req.body.address);
    address.owner = req.user._id;
    user.addresses.push(address);
    await address.save();
    await user.save();
    req.flash("success", "Your address is successfully added!");
    res.redirect(`/userside/profile/${user._id}`);
  };

  module.exports.deleteAddress = async (req,res) => {
    const { id, addressId } = req.params;
    const user = await User.findById(req.params.id);
    await User.findByIdAndUpdate(id, {$pull:{ addresses: addressId }} );
    await Address.findByIdAndDelete(req.params.addewssId);
    req.flash("success", "Address deleted!");
    res.redirect(`/userside/profile/${user._id}`);
  };

  module.exports.shoppingCart =  async (req,res) => {
    const user = await User.findById(req.params.id)
    .populate({
        path: 'carts',
        populate: {
            path: 'product'
        }
    });
    console.log(user);
    res.render('userside/cart', { user });
  };

// module.exports.editProfile = async (req,res) => {
//     const user = await User.findById(req.params.id)
//     res.render('admin/edituser', { user });
// };

// module.exports.updateProfile = async (req, res) => {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, {...req.body.user});
//     req.flash('success', 'Successfully updated!')
//     res.redirect(`/user/profile/${user._id}`)
// };
