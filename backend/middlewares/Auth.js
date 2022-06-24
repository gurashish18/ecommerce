const JWTtoken = require('jsonwebtoken')
const User = require('../models/UserModel.js');

exports.isAuthenticatedUser = async(req,res,next) => {
    const {token} = req.cookies;

    if(!token)
    {
        res.status(401).json({
            success:false,
            message: "Please login to access"
        })
    }
    else
    {
        const decodeddata = JWTtoken.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeddata.id);
        next();
    }
}

exports.authoriseRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(401).json({
                success:false,
                message: "You are not allowed to view this"
            })
            return;
        }
    
        next();
      };
}