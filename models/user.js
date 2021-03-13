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
});

const User = mongoose.model('User', userSchema);

module.exports = User;