const wrapAsync = require('./wrapAsync');

function authenticateUser(fn){
	return wrapAsync(async function(req, res, next){
		const {user_id:req_id} = req.params;
		const {user_id} = req.session;
		if(req_id === user_id){
			fn(req, res, next);
		} else {
			req.flash('error', "You don't have access to view this page!");
			res.redirect('/');
		}
	})
}

module.exports = authenticateUser;