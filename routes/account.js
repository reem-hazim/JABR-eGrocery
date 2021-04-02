const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const requireLogin = require('../utils/requireLogin');
const User = require('../models/user');
const Product = require('../models/product');
const AppError = require('../utils/AppError');

// Account page
router.get('/:id', requireLogin, (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		res.render('account', {title: "My Account", user_id});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
})

router.get('/:id/shoppingcart', requireLogin, wrapAsync(async (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id)
		.populate('shoppingCart.product')
		res.render('shoppingCart', {title: "My Shopping Cart", user});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// add product to shopping cart
router.post('/:user_id/shoppingcart/:product_id', requireLogin, wrapAsync(async (req, res)=>{
	const {user_id:req_id, product_id} = req.params;
	const {quantity=1} = req.body
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id);
		product = await Product.findById(product_id);
		if(!user || !product)
			throw AppError("User or Product not found", 505);

		let foundItem = user.findShoppingCartItem(product._id)
		// If this is a new item
		if(!foundItem){
			user.shoppingCart.push({product: product._id, quantity: quantity});
			await user.save();
		// If it's an existing item
		} else {
			foundItem.quantity += 1
			await user.save();
		}

		req.flash('success', 'Successfully added to shopping cart!')
		res.redirect(`/account/${user_id}/shoppingcart`)
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

module.exports = router;