const Cart = require("./../model/Cart");

const AddToCart = async (body) => {
  
  const addedProduct = await Cart.save();
  return addedProduct;
};

module.exports = { AddToCart};
