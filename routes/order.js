const express = require('express')
const router = express.Router();

const requireLogin = require('../utils/requireLogin');
const authenticateUser = require('../utils/authenticateUser')
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order')
const AppError = require('../utils/AppError');
const constants = require('../utils/constants')
const {validateCardNumber} = require('../utils/validator');
const {validationResult} = require('express-validator')

// checkout
router.get('/:user_id/checkout', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	res.render('orders/checkout', {title: "Checkout", user});
}))

// get order form
router.get('/:user_id/create', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	const {orderid=""} = req.query
	user = await User.findById(user_id);
	const emirates = ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Fujairah'];
	res.render('orders/create', {title: "One More Step", user, emirates, orderid});
}))

//create order
router.post('/:user_id/create', requireLogin, [validateCardNumber], authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	const errors = validationResult(req)
    if (!errors.isEmpty()) {
    	console.log(errors)
    	req.flash('error', 'Must be a valid credit card number')
      	return res.redirect(`/order/${user_id}/create`);
    }
	//find user
	user = await User.findById(user_id);
	//deconstruct the request body
	const {options} = req.body;
	let body = req.body;
	delete body.options;
	body.shippingCost = constants.shippingCost;
	if(body.paymentMethod === 'in person')
		delete body.paymentDetails
	else {
		body.paymentDetails.expiryDate = new Date(body.paymentDetails.expiryDate)
    	body.paymentDetails.expiryDate.setMonth(body.paymentDetails.expiryDate.getMonth()+1)
	}
	if(body.orderType === 'pickup')
		delete body.shippingAddress

	//create new order	
	let order = new Order(body);
	let old_order = {};
	if(options.order_id)
		old_order = await Order.findById(options.order_id)
	await order.checkout(user, old_order);
	//delete shopping cart
	await user.checkout(order._id, options, body);
	req.flash("success", "Successfully made an order! Please make sure you have received a confirmation email.");
	res.redirect(`/order/${user_id}/checkout`);
}))

// View order history
router.get('/:user_id/', requireLogin, authenticateUser(async (req, res)=>{
	const {user_id} = req.params;
	//find user
	user = await User.findById(user_id);
	await user.populate('orders').execPopulate();
	for (let order of user.orders)
		await order.populate('products.product').execPopulate();
	res.render('orders/index', {title: "Order History", user})
}))

module.exports = router;