const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./product');
const Order = require('./order');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email:{
		type: String,
		required: true,
		lowercase: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		default: ""
	},
	paymentDetails:{
		cardName : {
			type: String,
		},
		cardNumber: {
			type: Number,
		},
		expiryDate: {
			type: Date,
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
	shoppingCart: [{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		quantity: {
			type: Number,
			min: 1,
		}
	}],
	orders : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Order'
	}]
});

// Validate user
userSchema.statics.findAndValidate = async function(email, password){
	const foundUser = await this.findOne({email});
	if(!foundUser) return false;
	const isValid = await bcrypt.compare(password, foundUser.password);
	return isValid ? foundUser : false;
}

userSchema.methods.findItem = function(product_id){
	let foundItem = {};
	//search for item in user's shopping cart
	for(let item of this.shoppingCart){
		if(String(item.product._id) === String(product_id)){
			foundItem = item;
			break;
		}
	}
	return foundItem;
}

userSchema.methods.findItemAndAddToCart = async function(product_id, quantity, fromCart){
	const foundItem = this.findItem(product_id);

	if(Object.keys(foundItem).length === 0){
		this.shoppingCart.push({product: product_id, quantity: quantity});
		await this.save();
		return "Successfully added to shopping cart!";
	// If it's an existing item
	} else {
		if(fromCart){
			foundItem.quantity = quantity;
			await this.save();
			return "Successfully updated quantity!";
		} else {
			foundItem.quantity += quantity;
			await this.save();
			return "Successfully added to shopping cart!";
		}
	}
}

userSchema.methods.checkout = async function(order_id, options, body){
	this.orders.push(order_id)
	this.set({shoppingCart: []});
	if (options.save_card)
		this.paymentDetails = body.paymentDetails;
	if (options.save_address)
		this.shippingAddress = body.shippingAddress;
	await this.save();
}

userSchema.methods.addItemsFromOrder = async function(order_id){
	let foundItems = []
	let notFoundItems = []
	const order = await Order.findById(order_id);
	const unavProducts = await order.checkItemAvailability();
	for(let item of order.products){
		if(!unavProducts.includes(item.product.name)){
			let foundItem = this.findItem(item.product)
			if (Object.keys(foundItem).length === 0)
				notFoundItems.push(item)
			else{
				let obj = {
					quantity : item.quantity,
					foundItem
				}
				foundItems.push(obj)
			}
		}
	}

	this.shoppingCart.push.apply(this.shoppingCart, notFoundItems)
	for (let item of foundItems)
		item.foundItem.quantity += item.quantity;
	
	await this.save()
	return unavProducts;
}

userSchema.virtual('totalPrice').get(function(){
	let total = 0;
	for (let item of this.shoppingCart)
		total += (item.quantity*item.product.price);
	return total;
});

// Encrypt Password
userSchema.pre('save', async function(next){
	if(!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
})

userSchema.virtual('stringExpiryDate').get(function(){
	if(this.paymentDetails.expiryDate){
		const expiryDate = this.paymentDetails.expiryDate;
		const year = expiryDate.getFullYear();
		let month = expiryDate.getMonth();
		if(parseInt(month) < 10)
			month = '0' + month;
		return `${year}-${month}`
	}
	return "";
})

const User = mongoose.model('User', userSchema);

module.exports = User;
