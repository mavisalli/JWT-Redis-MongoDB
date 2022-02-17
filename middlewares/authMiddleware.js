const jwt = require("jsonwebtoken");
const redis_client = require("../redis_connect");

function verifyToken(req, res, next) {
  try {
    //bearer tokenstring
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.userData = decoded;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Your session is not valid",
      data: error,
    });
  }
}

function verifyRefreshToken(req, res, next) {
  const { token } = req.body;
  if (token === null)
    return res.status(401).json({ status: false, message: "Invalid request" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.userData = decoded;

    //verify if token is in redis store or not
    redis_client.get(decoded.sub.toString(), (err, data) => {
      if (err) throw err;
      if (data === null)
        return res.status(401).json({
          status: false,
          message: "Invalid request.. Token is not in store",
        });
      if (JSON.parse(data).token != token)
        return res.status(401).json({
          status: false,
          message: "Invalid request.. Token is not same in store",
        });
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Your session is not valid",
      data: error,
    });
  }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
};
