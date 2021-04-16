const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const requireLogin = require('../utils/requireLogin');
const User = require('../models/user');
const Product = require('../models/product');
const AppError = require('../utils/AppError');

// Account page
router.get('/:id', requireLogin, wrapAsync(async (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		const user = await User.findById(user_id)
		const emirates = ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Fujairah'];
		res.render('accounts/index', {title: "My Account", user, emirates});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// Edit account details
router.put('/:id', requireLogin, wrapAsync(async (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		await User.findByIdAndUpdate(user_id, req.body, {runValidators: true, new:true});
		req.flash('success', "Successfully updated your account details!");
		res.redirect(`/account/${user_id}`)
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// view shopping cart
router.get('/:id/shoppingcart', requireLogin, wrapAsync(async (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id)
		.populate('shoppingCart.product')
		res.render('accounts/shoppingCart', {title: "My Shopping Cart", user});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// add product to shopping cart
router.post('/:user_id/shoppingcart/:product_id', requireLogin, wrapAsync(async (req, res)=>{
	const {user_id:req_id, product_id} = req.params;
	const {quantity, fromCart} = req.body;
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id);
		product = await Product.findById(product_id);
		if(!user || !product)
			throw AppError("User or Product not found", 505);

		await user.findItemAndAddToCart(product._id, parseInt(quantity), fromCart)
		if(fromCart)
			req.flash('success', 'Successfully updated quantity!')
		else
			req.flash('success', 'Successfully added to shopping cart!')
		res.redirect(`/account/${user_id}/shoppingcart`)
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// Delete product from shopping cart
router.delete('/:user_id/shoppingcart/:product_id', requireLogin, wrapAsync(async (req, res)=>{
	const {user_id:req_id, product_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		await User.findByIdAndUpdate(user_id, { $pull: {shoppingCart: {product:product_id} }}, {new:true, useFindAndModify: false})
		req.flash("success", "Successfully deleted this product")
		res.redirect(`/account/${user_id}/shoppingcart`)

	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// specifyOrder
router.post('/:user_id/specifyOrder', requireLogin, wrapAsync(async (req, res)=>{
	const {user_id:req_id, product_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id);
		await user.checkout()
		res.render('orders/specifyOrder', {title: "One More Step", user});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// checkout
router.post('/:user_id/checkout', requireLogin, wrapAsync(async (req, res)=>{
	const {user_id:req_id, product_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id);
		await user.checkout()
		res.render('orders/checkout', {title: "Checkout", user});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))


module.exports = router;
