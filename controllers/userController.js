const User = require("../models/User");
const jwt = require("jsonwebtoken");
const redis_client = require("../redis_connect");

exports.createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json({
      status: true,
      message: "Your registered successfully !",
      data: savedUser,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Something went wrong", data: error });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }).exec();
    if (user === null)
      return res
        .status(400)
        .json({ status: false, message: "username or password is not valid" });

    const access_token = jwt.sign(
      { sub: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TIME }
    );
    const refresh_token = generateRefreshToken(user._id);
    return res.json({
      status: true,
      message: "login success",
      data: { access_token, refresh_token },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ status: true, message: "login fail", data: error });
  }
};

exports.createAccessToken = (req, res) => {
  const user_id = req.userData.sub;
  const access_token = jwt.sign(
    { sub: user_id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TIME }
  );
  const refresh_token = generateRefreshToken(user_id);
  return res.json({
    status: true,
    message: "success",
    data: { access_token, refresh_token },
  });
};

exports.logoutUser = (req, res) => {
  const user_id = req.userData.sub;
  const token = req.token;

  //remove the refresh token
  redis_client.del(user_id.toString());
  //blacklist current access token
  redis_client.set("BL_" + user_id.toString(), token);
  return res.json({ status: true, message: "success" });
};

exports.getDashboard = (req, res) => {
  return res.json({
    status: true,
    message: "Hello from Dashboard",
  });
};

function generateRefreshToken(user_id) {
  const refresh_token = jwt.sign(
    { sub: user_id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TIME }
  );

  redis_client.get(user_id.toString(), (err, data) => {
    if (err) throw err;

    redis_client.set(
      user_id.toString(), //id as a key, token is a value
      JSON.stringify({ token: refresh_token })
    );
  });

  return refresh_token;
}
