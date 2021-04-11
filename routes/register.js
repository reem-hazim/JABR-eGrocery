const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');


// Form
router.get('/', (req, res)=>{
	const title = "JABR Register"
	res.render('register', {title})
})

// Save new user to database
router.post('/', wrapAsync(async (req, res, next)=> {
	//set email as cookie
	const {email} = req.body;
	req.session.email = email;
	// Check if email exists
	const foundUser = await User.find({email});
	if(foundUser.length != 0){
		req.flash('error', "This email is already registered.")
		res.redirect('/register')
	} else{
		//save user to database
		const newUser = new User(req.body)
		await newUser.save();
		req.flash('success', "You've been successfully registered!");
		//redirect to login
		res.redirect('/login');
	}
}))


module.exports = router;