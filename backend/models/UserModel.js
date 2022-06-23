const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const JWTtoken = require('jsonwebtoken')

const userschema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter a name"],
        maxLength:[20, "Name cannot be greater than 20 characters"],
        minLength:[3, "Name cannot be smaller than 3 characters"]
    },
    email: {
        type: String,
        required:[true, "Please enter an email"],
        validate:[validator.isEmail, "Please enter a valid email"],
        unique:true
    },
    password: {
        type: String,
        required:[true, "Please enter a password"],
        minLength:[8, "Password must be minimum of 8 characters"],
        select:false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// encrypting password
userschema.pre("save", async function(next)
{
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//generating JWT token
userschema.methods.getJWTtoken = function ()
{
    return JWTtoken.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
}

//compare passwords
userschema.methods.comparePasswords = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userschema)