const mongoose = require('mongoose');
const Product = require('../models/product');

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
		featured: true,
		added: "2021-04-14",
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
		added: "2021-04-19",
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
		featured: true,
		added: "2021-04-21",
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
		added: "2021-04-11",
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
		featured: true,
		added: "2021-04-10",
	},
	{
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSVEcyoWRMx4NYaNaa0LjjLkQ1NHzI7pNqkHeYgIPOqd1_SgpkpeNsMb1oigSbO4VfdGQ7pkE&usqp=CAc",
		name: "Head & Shoulders Smooth and Silky Shampoo",
		price: 10.20,
		defWeight: "",
		qtyAvailable: 100,
		brand: "Head & Shoulders",
		department: "Health and Beauty",
		category: "Shampoos",
		featured: true,
		added: "2021-04-01",
	},
	{
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGJLhKYsC3CPsgAID_N7dGNIdzMKhxhRiSv7D1urZ2lAIs9WKn5rSzW7ctg&usqp=CAc",
		name: "Kellog's Coco Pops Chocos, 375 grams",
		price: 23.75,
		defWeight: "",
		qtyAvailable: 50,
		brand: "Kellog's",
		department: "Snacks",
		category: "Cereals",
		added: "2021-03-27",
	},
	{
		image: "https://media.istockphoto.com/photos/red-apple-fruit-with-green-leaf-isolated-on-white-picture-id925389178",
		name: "Apple",
		price: 9.99,
		defWeight: "kg",
		qtyAvailable: 30,
		brand: "Indian",
		department: "Produce",
		category: "Fruits",
		added: "2021-03-30",
	},
	{
		image: "https://www.luluhypermarket.com/medias/7548-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wyMzYwMTl8aW1hZ2UvanBlZ3xoNmUvaGFhLzk3NTc3NTM1NzM0MDYvNzU0OC0wMS5qcGdfMTIwMFd4MTIwMEh8OGJlOGJiNTdlOTMzMTk1MWM2ZjlhMDRlODFhZDlkZDNlOWZjOGNlNTA4ODAwODJhNDMyMTQ3MzhlODczYTQwYg",
		name: "Milk",
		price: 7.50,
		defWeight: "L",
		qtyAvailable: 14,
		brand: "Almarai",
		department: "Produce",
		category: "Diary",
		added: "2021-03-29",
	},
	{
		image: "https://www.ocado.com/productImages/954/95414011_0_640x640.jpg?identifier=120406857cc1594af97d383c022718e2",
		name: "Dove Handwash Shea Butter with Warm Vanilla",
		price: 15.00,
		defWeight: "",
		qtyAvailable: 55,
		brand: "Dove",
		department: "Health and Beauty",
		category: "Handwash",
		added: "2021-03-28",
	},
	{
		image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1603131448-61jog-dpsgl-sl1000-1603131436.jpg",
		name: "Differin Gel Acne Treatment",
		price: 25.00,
		defWeight: "",
		qtyAvailable: 25,
		brand: "Differin",
		department: "Health and Beauty",
		category: "Facial Care",
		added: "2021-03-18",
	},
	{
		image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1598299038-p427419-av-01-zoom.jpg",
		name: "The Ordinary Hyaluroic Acid",
		price: 29.00,
		defWeight: "",
		qtyAvailable: 42,
		brand: "The Ordinary",
		department: "Health and Beauty",
		category: "Facial Care",
		added: "2021-04-23",
	},
	{
		image: "https://www.sephora.ae/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw82483dc1/images/hi-res/SKU/SKU_1049/470348_swatch.jpg?sw=585&sh=585&sm=fit",
		name: "Power Bullet Matte Lipstick",
		price: 54.00,
		defWeight: "",
		qtyAvailable: 27,
		brand: "Sephora",
		department: "Health and Beauty",
		category: "Lip Products",
		added: "2021-04-25",
	},
	{
		image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1603132540-Naturopathica_659078104402-plp.jpg",
		name: "Sweet Cherry Brightening Enzyme Peel",
		price: 32.00,
		defWeight: "",
		qtyAvailable: 95,
		brand: "Naturopathica",
		department: "Health and Beauty",
		category: "Facial Care",
		added: "2021-04-18",
	},
	{
		image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1603135918-900.jpg",
		name: "Advantage Acne Spot Treatment",
		price: 12.00,
		defWeight: "",
		qtyAvailable: 22,
		brand: "Clean & Clear",
		department: "Health and Beauty",
		category: "Facial Care",
		added: "2021-04-12",
	},
	{
		image: "https://m.maccosmetics.ae/media/export/cms/products/640x600/mac_sku_SKEC16_640x600_0.jpg",
		name: "Powerglass Plumping Lip Gloss",
		price: 59.00,
		defWeight: "",
		qtyAvailable: 55,
		brand: "MAC",
		department: "Health and Beauty",
		category: "Lip Products",
		added: "2021-04-02",
	},



];


Product.insertMany(seedProducts)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})
