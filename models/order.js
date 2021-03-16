const mongoose = require('mongoose');
const Product = require('./product');

const orderSchema = new mongoose.Schema({
	totalPrice: {
		type: Number,
		min: 0,
	},
	products: [{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		quantity: {
			type: Number,
			min: 1,
		}
	}],
	orderType: {
		type: String,
		enum: ['pickup', 'delivery'],
	},
	delivery: {
		time: {
			type: Date,
		},
		shippingStatus: {
			type: String,
			enum: ['confirmed', 'shipped', 'outForDelivery', 'delivered'],
		},
		shippingAddress: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	pickupTime:{
		type: String,
	}
