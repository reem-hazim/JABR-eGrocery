const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const Product = require('../models/product');

// Products page
router.get('/', wrapAsync(async (req, res, next)=>{
	const title = "JABR Products"
	let q = req.query.q;

	if (q) { // search occurred
		// console.log("search occurred")
		const regex = new RegExp(q, 'gi');

		//find inside the db
		const allProducts = await Product.find({$or:[{ brand : regex }, { name : regex }]});
		if(allProducts.length < 1){
			// console.log("no products");
			req.flash('error', "No products match your search term, please try again!");
		}
		res.render("products", {title, allProducts, error: req.flash('error')});

	} else { // not a search so show default Products page
		// console.log("default Products")
		const allProducts = await Product.find({});
		// console.log(allProducts);
		res.render("products", {title, allProducts});
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
	res.render("showProduct", {product, title});
}))

module.exports = router;