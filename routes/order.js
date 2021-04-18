const express = require('express')
const router = express.Router();

const requireLogin = require('../utils/requireLogin');
const authenticateUser = require('../utils/authenticateUser')
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order')
const AppError = require('../utils/AppError');

// checkout
router.get('/:user_id/checkout', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	res.render('orders/checkout', {title: "Checkout", user});
}))

// get order form
router.get('/:user_id/create', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	user = await User.findById(user_id);
	const emirates = ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Fujairah'];
	res.render('orders/create', {title: "One More Step", user, emirates});
}))

//create order
router.post('/:user_id/create', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	//find user
	user = await User.findById(user_id);
	//deconstruct the request body
	const {options} = req.body;
	let body = req.body;
	delete body.options;
	//create new order	
	let order = new Order(body);
	await order.checkout(user);
	//delete shopping cart
	await user.checkout(order._id, options, body);
	req.flash("success", "Successfully made an order! Please make sure you have received a confirmation email.");
	res.redirect(`/order/${user_id}/checkout`);
}))

module.exports = router;