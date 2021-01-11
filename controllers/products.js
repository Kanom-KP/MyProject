const Product = require('../models/product');
const Review = require('../models/review');
const User = require('../models/user');
const Address = require('../models/address');

module.exports.allProducts = async (req, res) => {
  const activeproduct = await Product.find({ isAvailable: true });
  res.render("userside/u-allproduct", { activeproduct });
};


module.exports.productDetail = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "owner"
      }
    });
  if (!product) {
    req.flash("error", "This product might be deleted or did not exist");
    return res.redirect("/product/all");
  }
  res.render("userside/productdetail", { product });
};


module.exports.newReview = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const review = new Review(req.body.review);
  review.owner = req.user._id;
  product.reviews.push(review);
  await review.save();
  await product.save();
  req.flash("success", "Your review is successfully added!");
  res.redirect(`/product/${product._id}`);
};


module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(req.params.reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/product/${id}`);
};
