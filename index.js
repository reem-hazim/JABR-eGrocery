// Require packages
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');

//Require other files
const User = require('./models/user');
const AppError = require('./utils/AppError');
const wrapAsync = require('./utils/wrapAsync');
const requireLogin = require('./utils/requireLogin');
// const Product = require('./models/product');

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
	} else {
		res.locals.loggedIn = false;
	}
	next();
})

// Routes

// Form
app.get('/register', (req, res)=>{
	const title = "JABR Register"
	res.render('register', {title})
})

// Save new user to database
app.post('/register', wrapAsync(async (req, res, next)=> {
	//set email as cookie
	const {email} = req.body;
	req.session.email = email;
	//save user to database
	const newUser = new User(req.body)
	await newUser.save();
	req.flash('success', "You've been successfully registered!");
	//redirect to login
	res.redirect('/login');
}))

// Login form
app.get('/login', (req, res)=>{
	//Retrieve email cookie
	const {email=""} = req.session;
	const title = "JABR Login"
	res.render('login', {title, email})
})

// Login logic
app.post('/login', wrapAsync(async (req, res)=>{
	const {email, password} = req.body;
	const foundUser = await User.findAndValidate(email, password);
	if(foundUser){
		req.session.user_id = foundUser._id;
		req.flash('success', 'Successfully logged in!');
		res.redirect('/account/' + foundUser._id)
	} else {
		req.flash('error', 'The username or password is incorrect');
		res.redirect("/login");
	}
}));

app.post('/logout', (req, res)=>{
	req.session.user_id= null;
	// Redirect to home
	res.redirect('/');
})

// Home page
app.get('/', (req, res)=>{
	const title = "JABR eGrocery"
	res.render('home', {title})
})

// Products page
app.get('/products', wrapAsync(async (req, res, next)=>{
	const title = "JABR Products"
	let q = req.query.q;

	if (q) { // search occurred
		console.log("search occurred")
		const regex = new RegExp(q, 'gi');
		
		//find inside the db
		const allProducts = await User.find({$or:[{ firstName : regex }, { lastName : regex }]});
		if(allProducts.length < 1){
			console.log("no products");
			req.flash('error', "No products match your search term, please try again!");
		}
		res.render("products", {title, allProducts, error: req.flash('error')}); 

	} else { // not a search so show default Products page
		console.log("default Products")
		const allProducts = await User.find({});
		console.log(allProducts);
		res.render("products", {title, allProducts}); 
	}
}))

// Account page
app.get('/account/:id', requireLogin, (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		res.render('account', {title: "My Account", user_id});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
})

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