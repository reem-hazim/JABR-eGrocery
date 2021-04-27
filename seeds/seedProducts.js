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
		image: "https://chiquitabrands.com/wp-content/uploads/2019/08/Organics2.jpg",
		name: "Banana",
		price: 3.00,
		defWeight: "g",
		qtyAvailable: 200,
		brand: "Chiquita",
		department: "Produce",
		category: "Fruits",
		featured: true,
		added: "2021-04-09",
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
	{
		image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRZwcppvI_TumyWO6dkHiLTiagpX_Tgn0hIPqdwQispSGIEXBal3EVsRfmSAU5Sv08MLHNj11OrtsQ&usqp=CAc",
		name: "Lay's Salt Potato Chips 23g",
		price: 0.95,
		defWeight: "",
		qtyAvailable: 55,
		brand: "Lay's",
		department: "Snacks",
		category: "Chips",
		added: "2021-04-27",
	},
	{
		image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTKFxHaXTT7I5hHt9oMveYHxhLMJTEJlZp-vsPFfne6eMWiXn-x3Bcc3qArnCkBv369LBrJgWoYANs&usqp=CAc",
		name: "Snickers Chocolate Bar 50g",
		price: 2.60,
		defWeight: "",
		qtyAvailable: 55,
		brand: "Snickers",
		department: "Snacks",
		category: "Chocolates",
		added: "2021-04-27",
	},
	{
		image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQV65Wx8hgF7bg4K06pfwNpwr14-WHpDwbpNLALsUid-2Y_wpndASZN2ieXkTd90xvmIzOCXiEZrko&usqp=CAc",
		name: "TwixTop Chocolate Bars, 21g x 20",
		price: 21.56,
		defWeight: "",
		qtyAvailable: 55,
		brand: "Twix",
		department: "Snacks",
		category: "Chocolates",
		added: "2021-04-27",
	},

	{
		image: "https://images-na.ssl-images-amazon.com/images/I/81vJyb43URL._SL1500_.jpg",
		name: "Lay's Classic Potato Chips",
		price: 7.00,
		defWeight: "oz",
		qtyAvailable: 180,
		brand: "Lay's",
		department: "Snacks",
		category: "Chips",
		added: "2021-02-02",
	},

	{
		image: "https://images-na.ssl-images-amazon.com/images/I/81Yqf3flvcL._SL1500_.jpg",
		name: "Planters Lightly Salted Mixed Nuts",
		price: 14.99,
		defWeight: "oz",
		qtyAvailable: 12,
		brand: "Planters",
		department: "Snacks",
		category: "Mixed Nuts",
		added: "2021-03-01",
	},

	{
		image: "https://www.bigbasket.com/media/uploads/p/xxl/312169_10-britannia-bake-rusk-toast.jpg",
		name: "Britannia Bake Rusk Toast",
		price: 10.00,
		defWeight: "g",
		qtyAvailable: 75,
		brand: "Britannia",
		department: "Snacks",
		category: "Bread",
		added: "2021-03-31",
	},

	{
		image: "https://www.bigbasket.com/media/uploads/p/xxl/1201310-2_1-britannia-treat-jim-jam-biscuits.jpg",
		name: "Britannia Treat Jim Jam Cream Biscuits",
		price: 19.99,
		defWeight: "g",
		qtyAvailable: 28,
		brand: "Britannia",
		department: "Snacks",
		category: "Biscuit",
		added: "2021-03-31",
	},

	{
		image: "https://5.imimg.com/data5/SC/AK/LJ/SELLER-19591746/cadbury-oreo-vanilla-creme-biscuit-50gm-mrp-rs-10-500x500.jpg",
		name: "Cadbury Oreo Vanilla Creme Biscuit",
		price: 9.99,
		defWeight: "g",
		qtyAvailable: 74,
		brand: "Cadbury",
		department: "Snacks",
		category: "Biscuit",
		added: "2021-03-17",
	},

	{
		image: "https://images-na.ssl-images-amazon.com/images/I/71MQeIS7FAL.jpg",
		name: "Doritos Nacho Cheese Flavored Tortilla Chips",
		price: 4.99,
		defWeight: "oz",
		qtyAvailable: 48,
		brand: "Doritos",
		department: "Snacks",
		category: "Chips",
		added: "2021-03-24",
	},

	{
		image: "https://i5.walmartimages.com/asr/7dfe5a91-42c7-4048-a445-a7bd7dc466fe_1.4f064c498d96f41d9e80bb14f0df9d56.jpeg",
		name: "Barquillos Chocolate Wafer Rolls",
		price: 9.99,
		defWeight: "oz",
		qtyAvailable: 51,
		brand: "Barquillos",
		department: "Snacks",
		category: "Wafers",
		added: "2021-04-06",
	},






];

// Delete existing products
Product.deleteMany({})

// Insert new products
Product.insertMany(seedProducts)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})

mongoose.connection.close()
