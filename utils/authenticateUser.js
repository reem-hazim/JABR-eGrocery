function authenticateUser(fn){
	return function(req, res, next){
		const {user_id:req_id} = req.params;
		const {user_id} = req.session;
		if(req_id === user_id){
			fn(req, res, next).catch(e=>next(e))
		} else {
			req.flash('error', "You don't have access to view this page!");
			res.redirect('/');
		}
	}
}

module.exports = authenticateUser;