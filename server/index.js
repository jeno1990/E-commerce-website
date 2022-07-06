const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const auth = require("./Routes/auth");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Homepage");
});

//routes
app.use(auth);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
