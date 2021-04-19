const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const Product = require('../models/product');

// Products page
router.get('/', wrapAsync(async (req, res, next)=>{
	const title = "JABR Products"
	let q = req.query.q;
	let d = req.query.d;
	let s = req.query.sort;

	var allProducts;

	if (q) { // search occurred
		const regex = new RegExp(q, 'gi');
		allProducts = await Product.find({$or:[{ brand : regex }, { name : regex }]});
	}
	else if (d) { // department search occurred
		allProducts = await Product.find({department : d});
	}
	else {
		allProducts = await Product.find({});
	}

	if (s) { // sorting occurred
		switch(s){
			case "last":
				allProducts = await Product.find({}).sort({added: -1}); break;
			case "priceHigh":
				allProducts = await Product.find({}).sort({price: -1}); break;
			case "priceLow":
				allProducts = await Product.find({}).sort({price: 1}); break;
			case "default":
				allProducts = await Product.find({}); break;
		}
	}

	if (allProducts.length < 1){
		req.flash('error', "No products match your search term, please try again!");
		res.render("products/index", {title, allProducts, error: req.flash('error')});
	} else {
		res.render("products/index", {title, allProducts});
	}

}))

router.get('/:id', wrapAsync(async (req, res, next)=>{
	const {id} = req.params;
	const product = await Product.findById(id);
	if(!product){
		req.flash('error', 'Product not available');
		res.redirect('/products');
	}
	const title = product.name;
	res.render("products/show", {product, title});
}))

module.exports = router;
