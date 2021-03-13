const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		lowercase: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
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
		cardNumber: {
			type: Number,
		},
		CVV: {
			type: Number,
		},
		expiryDate: {
			type: Date,
		},
		billingAddress: {
			address1: {
				type: String,
			},
			address2: {
				type: String,
			},
			emirate: {
				type: String,
				lowercase: true,
				enum: ['dubai', 'abu dhabi', 'ajman', 'sharjah', 'ras al khaimah', 'umm al quwain', 'fujairah'],
			}
		}
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
			lowercase: true,
			enum: ['dubai', 'abu dhabi', 'ajman', 'sharjah', 'ras al khaimah', 'umm al quwain', 'fujairah'],
			default: "abu dhabi",
		}	
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;