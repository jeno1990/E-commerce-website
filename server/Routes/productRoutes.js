const route = require("express").Router();
const middleware = require("./jwtMiddleware");

const productDatabase = require("../Mongo/productDatabase");

//add products

route.post("/addproduct", middleware.VerfyAdmin, async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ msg: "bad request" });
  }
  try {
    const savedProduct = await productDatabase.AddProduct(body);
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//Delete products
route.post("/deleteproduct/:id", middleware.VerfyAdmin, async (req, res) => {
  const id = req.params["id"];
  try {
    await productDatabase.deleteProduct(id);
    res.status(200).json({ msg: "product deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//Get product
route.get("/getproduct/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const product = await productDatabase.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//Get product
route.get("/getproducts", async (req, res) => {
    const newp = req.query.new;
    const catagory = req.query.catagory;
    try {
      const product = await productDatabase.getProducts(newp , catagory);
      res.status(200).json(product);
    } catch (error) {
        console.log(error)
      res.status(500).json({ msg: "Internal server error" });
    }
  });

module.exports = route;
