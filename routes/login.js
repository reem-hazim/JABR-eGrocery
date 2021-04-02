const express = require('express')
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');


// Login form
router.get('/login', (req, res)=>{
	//Retrieve email cookie
	const {email=""} = req.session;
	const title = "JABR Login"
	res.render('login', {title, email})
})

// Login logic
router.post('/login', wrapAsync(async (req, res)=>{
	const {email, password} = req.body;
	const foundUser = await User.findAndValidate(email, password);
	if(foundUser){
		req.session.user_id = foundUser._id;
		req.flash('success', 'Successfully logged in!');
		res.redirect('/'); 
	} else {
		req.flash('error', 'The username or password is incorrect');
		res.redirect('/login');
	}
}));

router.post('/logout', (req, res)=>{
	req.session.user_id = null;
	// Redirect to home
	req.flash('success', 'Successfully logged out!')
	res.redirect('/');
})

module.exports = router;