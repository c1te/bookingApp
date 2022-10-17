const ErrorHandler = require("../util/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../util/jwtToken.js");

//Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  //Fetch required Data For User
  const { name, email, password, avatar } = req.body;
  //Create User
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Sample avatar id",
      url: "sampleurl",
    },
  });

  sendToken(user, 200, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //Checking if both email and password are provide by the user
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

//Logout User
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    messgae: "Logged Out",
  });
});

//Get User Detail
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//Get All Users -- Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user--Admin
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id, function (err, doc) {
    if (err) {
      return next(new ErrorHandler(`User with ${req.params.id} not found`));
    }
  });

  if (!user) {
    return next(new ErrorHandler(`User with ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User role--Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//DeleteUser--Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  //delete Cloudinary
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User with id ${req.params.id} does not exist `, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted",
  });
});
