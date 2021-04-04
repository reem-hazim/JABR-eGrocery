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
		res.render('account', {title: "My Account", user});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// edit account form
router.get('/:id/edit', requireLogin, wrapAsync(async (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		const user = await User.findById(req_id)
		res.render('editAccount', {title: "Edit Product", user})
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}

}))

router.put('/:id', requireLogin, wrapAsync(async (req, res)=>{
	const {id:req_id} = req.params;
	const {user_id} = req.session;
	if(req_id === user_id){
		const {firstName,
				lastName,
				email,
				phoneNumber,
				address1,
				address2,
				emirate } = req.body;

		const update_data = {
			firstName,
			lastName,
			email,
			phoneNumber,
			shippingAddress: {
				address1,
				address2,
				emirate
			}
		};
		await User.findByIdAndUpdate(user_id, update_data, {runValidators: true, new:true});
		req.flash('success', "Successfully updated your account!");
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
		res.render('shoppingCart', {title: "My Shopping Cart", user});
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))

// add product to shopping cart
router.post('/:user_id/shoppingcart/:product_id', requireLogin, wrapAsync(async (req, res)=>{
	const {user_id:req_id, product_id} = req.params;
	const {quantity} = req.body;
	const {user_id} = req.session;
	if(req_id === user_id){
		user = await User.findById(user_id);
		product = await Product.findById(product_id);
		if(!user || !product)
			throw AppError("User or Product not found", 505);

		await user.findItemAndAddToCart(product._id, parseInt(quantity))
		req.flash('success', 'Successfully added to shopping cart!')
		res.redirect(`/account/${user_id}/shoppingcart`)
	} else {
		req.flash('error', "You don't have access to view this page!");
		res.redirect('/');
	}
}))


module.exports = router;
