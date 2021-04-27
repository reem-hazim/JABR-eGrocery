const mongoose = require('mongoose');
const Product = require('./product');

const orderSchema = new mongoose.Schema({
	shippingCost: {
		type: Number,
		min: 0,
	},
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
		cardName: {
			type: String,
		},
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
	createdAt: {type: Date, default: Date.now},
})

orderSchema.methods.calculateTotalPrice = async function(){
	let total = 0;
	await this.populate('products.product', {price: 1}).execPopulate();
	for (let item of this.products)
		total += (item.quantity * item.product.price);
	this.totalPrice = total.toFixed(2) + this.shippingCost;
	await this.save();
	return this.totalPrice;
}

orderSchema.methods.checkout = async function(user, old_order){
	if(old_order.products)
		this.set('products', old_order.products)
	else
		this.set('products', user.shoppingCart)
	await this.save();
	for (let item of this.products){
		let product = await Product.findById(item.product);
		product.qtyAvailable -= item.quantity;
		await product.save();
	}
	await this.calculateTotalPrice();	
}

orderSchema.methods.checkItemAvailability =async function(){
	await this.populate('products.product', {qtyAvailable: 1, name: 1, _id: 1}).execPopulate();
	let result = []
	for (let item of this.products){
		if(item.product.qtyAvailable < item.quantity)
			result.push(item.product.name)
	}
	return result;
}

module.exports = mongoose.model('Order', orderSchema)
