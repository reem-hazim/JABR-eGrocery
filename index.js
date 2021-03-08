const express = require("express");

const app = express();

app.get('/', (req, res)=>{
	res.send("Home page")
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