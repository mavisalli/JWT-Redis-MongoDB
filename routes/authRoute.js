const route = require(express).Router();

const {
  createUser,
  loginUser,
  logoutUser,
  getAccessToken,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyRefreshToken,
} = require("../middlewares/authMiddleware");

route.post("/register", createUser);
route.post("/login", loginUser);
route.post("/token", verifyRefreshToken, getAccessToken);
route.get("/logout", verifyToken, logoutUser);

module.exports = route;
