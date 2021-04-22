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

		if (allProducts.length < 1){
			req.flash('error', "No products match your search term, please try again!");
			res.render("products/index", {title, allProducts, s, error: req.flash('error')});
		}

	}

	else if (d) { // department search occurred
		allProducts = await Product.find({department : d});
	}

	else { // just accessing the main products page
		allProducts = await Product.find({});
	}

	function sortResults(prop, asc) {
		allProducts.sort(function(a, b){
				if (asc) {
					return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
				} else {
					return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
				}
		});
	};

	var sortedProducts;
	switch (s) {
			case "last":
				sortedProducts = sortResults('added', false); break;
			case "priceHigh":
				sortedProducts = sortResults('price', false); break;
			case "priceLow":
				sortedProducts = sortResults('price', true); break;
			default:
				sortedProducts = allProducts; break;
	 }

	console.log(sortedProducts);
	res.render("products/index", {title, sortedProducts, s});
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
