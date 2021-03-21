const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/abrajTest', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>{
		console.log("Mongodb Connection open!")
	})
	.catch(err => {
		console.log("Error connecting to MongoDB")
		console.log(err)
	})

const seedProducts = [
	{
		image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTNYesA3O63MgtSjKPURsVnG2GYyv_uniZleDO8VafDgZcSyhnopwa-F0xTcJAz8_oqmFpM-fqAKg&usqp=CAc",
		name: "Lemon",
		price: 35.99,
		defWeight: "kg",
		qtyAvailable: 15,
		brand: "Spain",
		department: "Produce",
		category: "Fruits",
	},
	{
		image: "https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=",
		name: "Tomato",
		price: 1.50,
		defWeight: "kg",
		qtyAvailable: 30,
		brand: "Jordan",
		department: "Produce",
		category: "Fruits",
	}
];


Product.insertMany(seedProducts)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})