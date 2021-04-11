// Require packages
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override')
//Require models
const User = require('./models/user');
const Product = require('./models/product');

// Require utils
const AppError = require('./utils/AppError');
const wrapAsync = require('./utils/wrapAsync');
const requireLogin = require('./utils/requireLogin');

// Require routes
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const productRoutes = require('./routes/products');
const accountRoutes = require('./routes/account')

// Validator for email and password:
// https://www.npmjs.com/package/validator

// Set up
const app = express();
mongoose.connect('mongodb://localhost:27017/abrajTest', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>{
		console.log("Mongodb Connection open!")
	})
	.catch(err => {
		console.log("Error connecting to MongoDB")
		console.log(err)
	})

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.urlencoded({extended: true}));

const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions));

app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Middleware set up res.locals
app.use((req, res, next)=>{
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	if(req.session.user_id){
		res.locals.loggedIn = true;
		res.locals.user_id = req.session.user_id
	} else {
		res.locals.loggedIn = false;
	}
	next();
})

// Routes
app.use('/register', registerRoutes);
app.use('/', loginRoutes);
app.use('/products', productRoutes);
app.use('/account', accountRoutes);

// Home page
app.get('/', wrapAsync(async (req, res, next)=>{
	const title = "JABR eGrocery"
	const featuredProducts = await Product.find({featured : true});
	const latestProducts = await Product.aggregate([{ $match: {'added': {$exists: true}}}, { $sort: { added : -1} }]);
	res.render('home', {title, featuredProducts, latestProducts})
}))

app.get('/about', (req, res)=>{
	const title = "JABR About"
	res.render('about', {title})
})

app.get('/contact', (req, res)=>{
	const title = "JABR Contact"
	res.render('contact', {title})
})

// Undefined route error
app.get('*', (req, res)=>{
	res.status(404).send("Sorry, the page you requested doesn't exist!")
})

app.use((err, req, res, next)=>{
	console.log(err.name);
	next(err);
})

// Error handler
app.use((err, req, res, next)=>{
	const {status = 500, message = "Something went wrong"} = err;
	res.status(status)
	console.log(message);
	res.render('error', {title:"Error"});
})

app.listen(3000, ()=>{
	console.log("listening on port 3000")
})
