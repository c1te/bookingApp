//Creating token and saving in cookie
const sendToken = (user, statuscode, res) => {
  const token = user.getJWTToken();

  //Options for cookie
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
