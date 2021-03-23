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
	},
	{
		image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.foodinis.com%2Fapp%2Fuploads%2F2016%2F12%2Fcucumbers.jpg&f=1&nofb=1",
		name: "Cucumber",
		price: 3.50,
		defWeight: "kg",
		qtyAvailable: 20,
		brand: "Lebanon",
		department: "Produce",
		category: "Vegetables",
	},
	{
		image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fharvestdelivery.ca%2Fwp-content%2Fuploads%2F2020%2F11%2FYellow-onion-3lb-bag.jpg&f=1&nofb=1",
		name: "Onion",
		price: 9.00,
		defWeight: "kg",
		qtyAvailable: 10,
		brand: "UAE",
		department: "Produce",
		category: "Vegetables",
	},
	{
		image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc8%2FPotato_and_cross_section.jpg%2F1200px-Potato_and_cross_section.jpg&f=1&nofb=1",
		name: "Potato",
		price: 4.00,
		defWeight: "kg",
		qtyAvailable: 55,
		brand: "Saudi Arabia",
		department: "Produce",
		category: "Vegetables",
	}
];


Product.insertMany(seedProducts)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})