const User = require('../models/UserModel.js')
const sendToken = require('../utils/SendToken.js')

// Register a user
exports.createUser = async(req,res,next) => {
    try {
        const {name, email, password} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "sampleid",
                url: "sampleurl"
            }
        })

        sendToken(user, 201, res)
    } catch (error) {
        return next(error)
    }
    
}

//Login a user
exports.loginUser = async(req,res,next) => {
    try {
        const {email,password} = req.body;

        if(!email || !password)
        {
            res.status(401).json({
                success:false,
                message: "Enter email or password"
            })
        }

        const user = await User.findOne({email:email}).select("+password");

        if(!user)
        {
            res.status(401).json({
                success:false,
                message: "Invalid email or password"
            })
        }

        const isPasswordMatch = await user.comparePasswords(password);

        if(!isPasswordMatch)
        {
            res.status(401).json({
                success:false,
                message: "Invalid email or password"
            })
        }

        sendToken(user, 201, res)
    } catch (error) {
        return next(error)
    }
    
}

//Logout User
exports.logoutUser = async(req,res,next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return next(error)
    }
}