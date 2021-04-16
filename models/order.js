const mongoose = require('mongoose');
const Product = require('./product');

const orderSchema = new mongoose.Schema({
	totalPrice: {
		type: Number,
		min: 0,
	},
	products: [{
		product: {
			type: mongoose.Schema.Types.ObjectId,
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
	paymentMethod: {
		type: String,
		enum: ['card', 'in person']
	},
	paymentDetails:{
		cardNumber: {
			type: Number,
		},
		CVV: {
			type: Number,
		},
		expiryDate: {
			type: Date,
		}
	},
	delivery: {
		date: {
			type: Date,
		},
		shippingStatus: {
			type: String,
			enum: ['confirmed', 'shipped', 'outForDelivery', 'delivered'],
		},
	},
	shippingAddress: {
		address1: {
			type: String,
			default: "",
		},
		address2: {
			type: String,
		},
		emirate: {
			type: String,
			enum: ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Fujairah'],
		}
	},
	pickupTime:{
		type: String,
	},
	sendReceipt: Boolean,
})

orderSchema.methods.calculateTotalPrice = function(){
	let total = 0;
	for (let product of this.products)
		total += product.quantity;
	this.totalPrice = total;
	return total;
}

module.exports = mongoose.model('Order', orderSchema)
