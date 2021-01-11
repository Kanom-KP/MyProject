if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Joi = require('joi');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const { isLoggedIn } = require('./middleware');
const { checkAdmin } = require('./middleware');

const Product = require('./models/product');
const Review = require('./models/review');
const User = require('./models/user');
const Address = require('./models/address');

const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const ejsLint = require('ejs-lint');

mongoose.connect('mongodb://localhost:27017/productdata', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views' ,path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

    const sessionConfig = {
        secret: 'topsecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 *60 *60*24*7,
            maxAge: 1000 *60 *60*24*7
        }
    }
app.use(session(sessionConfig))
app.use(flash()) 

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Put it before routes handler
app.use ((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/admin', adminRoutes)
app.use('/product', productRoutes)
app.use('/user', userRoutes)


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

app.post('/regis', catchAsync(async (req,res,next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User ({ email, username});
        const regisUser =  await User.register(user, password);
        req.login(regisUser, err => {
            if(err) return next(err);
            console.log(regisUser);
            req.flash('success', 'Registration done!, Welcome to FurFriends!');
            res.redirect('/product/all');
        })
        } catch (e) { 
            req.flash('error', e.message);
            res.redirect('/product/all');
        }
})) 

app.post('/login', passport.authenticate('local', { failerFlash: true, failureRedirect: '/login'  }), (req,res) => {
    req.flash('success', 'Welcome to FurFriends');
    const redirectUrl = req.session.returnTo || '/product/all' ;
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

app.get('/logout', (req,res) => {
    req.logout();
    req.flash('success', 'Successfully logged out')
    res.redirect('/product/all');
})

app.all('*', (req, res, next) =>{
   next(new ExpressError('Page not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
}) 