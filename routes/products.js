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

	switch (s) {
			case "last":
				allProducts.sort((a, b) => b.added - a.added); break;
			case "priceHigh":
				allProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
			case "priceLow":
				allProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
			default:
				break;
	}

	res.render("products/index", {title, allProducts, s});
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
