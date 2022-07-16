const User = require("../models/UserModel.js");
const sendToken = require("../utils/SendToken.js");
const sendEmail = require("../utils/SendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a user
exports.createUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const { name, email, password } = req.body;

    //check if a user exsist with this email
    const prevuser = await User.findOne({ email: email });

    if (prevuser) {
      res.status(400).json({
        success: false,
        message: "Account exsists with this email",
      });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(error);
  }
};

//Login a user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        success: false,
        message: "Enter email or password",
      });
      return;
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordMatch = await user.comparePasswords(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(error);
  }
};

//Logout User
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// Get Password Reset Token
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  // Get ResetPassword Token
  const resetToken = user.getResetToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:3001/password/reset/${resetToken}`;
  const message = `Your password reset token is -> \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please     ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  const resettoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find a user with that reset token
  const user = await User.findOne({
    resetPasswordToken: resettoken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // if no user found with that token or token has been expired
  if (!user) {
    res.status(400).json({
      success: false,
      message: "Invalid Reset token or token has been expired",
    });
    return;
  }

  // if the new passwords doesn't match
  if (req.body.password !== req.body.confirmpassword) {
    res.status(400).json({
      success: false,
      message: "Passwords doesn't match",
    });
    return;
  }

  // Now update the password of the user
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
};

// Get user's details
exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

//change user's password
exports.changePassword = async (req, res, next) => {
  // we will have 3 fields
  // Oldpassword
  // Newpassword
  // Confirmpassword
  const user = await User.findById(req.user.id).select("+password");
  console.log(user);

  const isPasswordMatch = await user.comparePasswords(req.body.oldpassword);

  if (!isPasswordMatch) {
    // oldpassword doesn't match
    res.status(401).json({
      success: false,
      message: "Old password doesn't match",
    });
    return;
  }

  // if newpassword doesn't match confirm apssword
  if (req.body.newpassword !== req.body.confirmpassword) {
    res.status(401).json({
      success: false,
      message: "Passwords doesn't match",
    });
    return;
  }

  // all passwords match now update
  user.password = req.body.newpassword;
  await user.save();

  sendToken(user, 200, res);
};

//Update user's profile
exports.updateProfile = async (req, res, next) => {
  const newuserdata = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newuserdata, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    user,
  });
};

// Get all users (ADMIN)
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

// Get single user (ADMIN)
exports.getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "No user with that id",
    });
    return;
  }

  res.status(200).json({
    success: true,
    user,
  });
};

// Update User Role (ADMIN)
exports.updateRole = async (req, res, next) => {
  const newuserdata = {
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newuserdata, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    user,
  });
};

// Delete User (AADMIN)
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User not found with that id",
    });
    return;
  }

  await user.remove();

  res.status(200).json({
    success: false,
    message: "User deleted successfully",
  });
};
