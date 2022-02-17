const express = require("express");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());

//routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("server is running");
});
