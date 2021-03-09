const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res)=>{
	const title = "Abraj eGrocery"
	res.render('home', {title})
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