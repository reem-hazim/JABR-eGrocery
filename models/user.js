const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Validate user
userSchema.statics.findAndValidate = async function(email, password){
	const foundUser = await this.findOne({email});
	if(!foundUser) return false;
	const isValid = await bcrypt.compare(password, foundUser.password);
	return isValid ? foundUser : false;
}

// Encrypt Password
userSchema.pre('save', async function(next){
	if(!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;