const route = require(express).Router();

const { getDashboard } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

route.get("/dashboard", verifyToken, getDashboard);

module.exports = route;
