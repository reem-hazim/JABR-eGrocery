const requireLogin = (req, res, next)=>{
	if(!req.session.user_id){
		req.flash('error', "Please log in first!");
		res.redirect('/login');
	} else {
		next();
	}
}

module.exports = requireLogin;