const express = require("express");
const path = require('path');
const mongoose = require('mongoose')

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

// Users schema
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	address: String,
	phone_number: String,

});

// Mongoose model
const User = mongoose.model('User', userSchema);
const reem = new User({
	username: "Reem", 
	password: "hello", 
	address:"Dubai, UAE", 
	phone_number:"055 839 3788"
});

app.use(express.static(path.join(__dirname, '/static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.get('/', (req, res)=>{
	const title = "Abraj eGrocery"
	res.render('home', {title})
})

app.get('/item/:itemName', (req, res)=>{
	const {itemName} = req.params;
	res.send(`Looking at ${itemName} item`)
})

app.get('/login', (req, res)=>{
	const title = "Abraj Login"
	res.render('login', {title})
})

app.get('/item/:itemName', (req, res)=>{
	const {itemName} = req.params;
	res.send(`Looking at ${itemName} item`)
})

app.get('*', (req, res)=>{
	res.send("Sorry, the page you requested doesn't exist!")
})

app.listen(3000, ()=>{
	console.log("listening on port 3000")
})