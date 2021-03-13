// Required packages
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

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
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

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
app.post('/register', async (req, res)=> {
	const newUser = new User(req.body);
	try {
		await newUser.save();
		res.redirect('/login');
	} catch(e){
		res.status(400).send('<h3>' + e.message+ '</h3>');
	}
})

// NavBarTab pages
app.get('/login', (req, res)=>{
	const title = "JABR Login"
	res.render('login', {title})
})

app.get('/products', (req, res)=>{
	const title = "JABR Products"
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

app.listen(3000, ()=>{
	console.log("listening on port 3000")
})