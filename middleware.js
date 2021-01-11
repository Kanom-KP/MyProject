const user = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
    console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo =  req.originalUrl
        req.flash('error', 'You must be sign in');
        return res.redirect('/product/all');
    }
    next();
}

// module.exports.checkAdmin = (req, res, next) => {
//     console.log("REQ.USER...", req.user);
//     if (req.isAuthenticated(),user.isAdmin === true) {
//         req.flash('success', 'Hello Admin!');
//         return next();
//     } else {
//         req.flash('error', 'You must be an admin to access this page');
//         return res.redirect('product/all');
//     }
// }

