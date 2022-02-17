const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// Connect DB
mongoose
  .connect(process.env.MONGO_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });

app.use(express.json());

//routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("server is running");
});
