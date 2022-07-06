const route = require("express").Router();
const middleware = require("./jwtMiddleware");

const CartDatabase = require("../Mongo/cartDatabase");

//add to cart

route.post("/addtocart", middleware.Verifytoken, async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ msg: "bad request" });
  }
  try {
    const savedProduct = await CartDatabase.AddToCart(body);
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});


module.exports = route;
