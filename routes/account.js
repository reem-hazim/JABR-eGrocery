const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const authenticateUser = require('../utils/authenticateUser')
const requireLogin = require('../utils/requireLogin');
const User = require('../models/user');
const Product = require('../models/product');
const AppError = require('../utils/AppError');

// Account page
router.get('/:user_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	const user = await User.findById(user_id)
	const emirates = ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Fujairah'];
	res.render('accounts/index', {title: "My Account", user, emirates});
}))

// Edit account details
router.put('/:user_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	await User.findByIdAndUpdate(user_id, req.body, {runValidators: true, new:true});
	req.flash('success', "Successfully updated your account details!");
	res.redirect(`/account/${user_id}`)
}))

// view shopping cart
router.get('/:user_id/shoppingcart', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	user = await User.findById(user_id)
	.populate('shoppingCart.product')
	res.render('accounts/shoppingCart', {title: "My Shopping Cart", user});
}))

// add product to shopping cart
router.post('/:user_id/shoppingcart/:product_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id, product_id} = req.params;
	const {quantity, fromCart} = req.body;
	user = await User.findById(user_id);
	product = await Product.findById(product_id);
	if(!user || !product)
		throw AppError("User or Product not found", 505);
	const flash_message = await user.findItemAndAddToCart(product._id, parseInt(quantity), fromCart)
	req.flash('success', flash_message)
	res.redirect(`/account/${user_id}/shoppingcart`)
}))

// Delete product from shopping cart
router.delete('/:user_id/shoppingcart/:product_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id, product_id} = req.params;
	await User.findByIdAndUpdate(user_id, { $pull: {shoppingCart: {product:product_id} }}, {new:true, useFindAndModify: false})
	req.flash("success", "Successfully deleted this product")
	res.redirect(`/account/${user_id}/shoppingcart`)
}))

module.exports = router;
