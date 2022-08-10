const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

	//verify authorization
	const { authorization } = req.headers

	if(!authorization){
		res.status(401).json({error: "Authorization token required"})
	}

	const token = authorization.split(' ')[1]

	try{
		const {_id} = jwt.verify(token, process.env.SECRET)

		req.user = await User.findOne({_id}).select('_id')
		next()

	}catch(e){
		res.status(401).json({error: "Request not authorized"})
	}
}

module.exports = requireAuth






