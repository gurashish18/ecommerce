const User = require('../models/UserModel.js')

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

        const token = user.getJWTtoken();
        res.status(201).json({
            success: true,
            token
        })
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

        const token = user.getJWTtoken();

        res.status(200).json({
            success:true,
            token
        })
    } catch (error) {
        return next(error)
    }
    
}