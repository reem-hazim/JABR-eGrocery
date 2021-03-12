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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.get('/', (req, res)=>{
	const title = "Abraj eGrocery"
	res.render('home', {title})
})

// Just a demo
// app.get('/item/:itemName', (req, res)=>{
// 	const {itemName} = req.params;
// 	res.send(`Looking at ${itemName} item`)
// })

app.get('/login', (req, res)=>{
	const title = "Abraj Login"
	res.render('login', {title})
})

app.get('/register', (req, res)=>{
	const title = "Abraj Register"
	res.render('register', {title})
})

app.get('*', (req, res)=>{
	res.send("Sorry, the page you requested doesn't exist!")
})

app.listen(3000, ()=>{
	console.log("listening on port 3000")
})