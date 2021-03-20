// Require packages
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const cookieParser= require('cookie-parser');
const bcrypt = require('bcrypt');

//Require other files
const User = require('./models/user');
// const Product = require('./models/product');
const AppError = require('./AppError');

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
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Utilities
function wrapAsync(fn){
	return function(req, res, next){
		fn(req, res, next).catch(e => next(e))
	}
}

// Routes

// Home page
app.get('/', (req, res)=>{
	const title = "JABR eGrocery"
	res.render('home', {title})
})

// Registration

// Form
app.get('/register', (req, res)=>{
	const title = "JABR Register"
	res.render('register', {title})
})

// Save new user to database
app.post('/register', wrapAsync(async (req, res, next)=> {
	//set email as cookie
	const {firstName, lastName, email, password} = req.body;
	res.cookie("email", email);
	// Encrypt (hash) password
	const hash = await bcrypt.hash(password, 12);
	//save user to database
	const newUser = new User({
		firstName,
		lastName,
		email,
		password: hash,
	});
	await newUser.save();
	//redirect to login
	res.redirect('/login');
}))

// NavBarTab pages
app.get('/login', (req, res)=>{
	//Retrieve email cookie
	const {email=""} = req.cookies;
	const title = "JABR Login"
	res.render('login', {title, email})
})

app.get('/products', (req, res)=>{
	const title = "JABR Products"
	var q = req.query.q;
	if (q) { // search occurred
		console.log("search occurred")
		const regex = new RegExp(q, 'i'); //case insensitive
		User.find(
			{$or:[
				{ firstName : regex },
				{ lastName : regex }
			]},
			function(err, res) {
				if(err) {
					console.log(err);
				} else {
					console.log(res);
					// now need to pass res to the page content
				}
			} 
		)
		;
	} else { // not a search
		console.log("default Products") // show default "Products" page
	}

	res.render('products', {title})
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