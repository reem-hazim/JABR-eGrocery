const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const authenticateUser = require('../utils/authenticateUser')
const requireLogin = require('../utils/requireLogin');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const AppError = require('../utils/AppError');
const constants = require('../utils/constants');
const {validateCardNumber} = require('../utils/validator');
const {validationResult} = require('express-validator')


// Account page
router.get('/:user_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	const user = await User.findById(user_id)
	const emirates = ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Fujairah'];
	res.render('accounts/index', {title: "My Account", user, emirates});
}))

// Edit account details
router.put('/:user_id', requireLogin, [validateCardNumber], authenticateUser(async (req, res, next)=>{
	const {user_id} = req.params;
	const errors = validationResult(req)
    if (!errors.isEmpty()) {
    	console.log(errors)
    	req.flash('error', "Sorry, that doesn't seem to be a valid card number. Please try again.")
      	return res.redirect(`/account/${user_id}`);
    }
    let userInfo = req.body
    userInfo.paymentDetails.expiryDate = new Date(userInfo.paymentDetails.expiryDate)
    userInfo.paymentDetails.expiryDate.setMonth(userInfo.paymentDetails.expiryDate.getMonth()+1)
	await User.findByIdAndUpdate(user_id, userInfo, {runValidators: true, new:true});
	req.flash('success', "Successfully updated your account details!");
	res.redirect(`/account/${user_id}`)
}))

// view shopping cart
router.get('/:user_id/shoppingcart', requireLogin, authenticateUser(async (req, res, next)=>{
	const {user_id} = req.params;
	user = await User.findById(user_id)
	.populate('shoppingCart.product')
	const total = user.totalPrice;
	res.render('accounts/shoppingCart', {title: "My Shopping Cart", user, shippingCost: constants.shippingCost, total});
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

// Add products from an order to shopping cart
router.post('/:user_id/shoppingcart/order/:order_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id, order_id} = req.params;
	user = await User.findById(user_id);
	order = await Order.findById(order_id);
	if(!user || !order)
		throw AppError("User or Order not found", 505);
	// user.shoppingCart.push.apply(user.shoppingCart, order.products)
	// await user.save();
	const unavProducts = await user.addItemsFromOrder(order_id);
	if(unavProducts.length > 0)
		req.flash('error', "Sorry, there isn't enough stock available for some of your products.")
	else
		req.flash('success', "Successfully added your order to your shopping cart!")
	res.redirect(`/account/${user_id}/shoppingcart`)
}))

// Delete product from shopping cart
router.delete('/:user_id/shoppingcart/:product_id', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id, product_id} = req.params;
	await User.findByIdAndUpdate(user_id, { $pull: {shoppingCart: {product:product_id} }}, {new:true, useFindAndModify: false})
	req.flash("success", "Successfully removed this product from your cart.")
	res.redirect(`/account/${user_id}/shoppingcart`)
}))

module.exports = router;
