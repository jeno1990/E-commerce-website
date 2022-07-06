const Product = require("./../model/Products");

const AddProduct = async (body) => {
  const product = new Product({
    title: body.title,
    desc: body.desc,
    catagory: body.catagory,
    size: body.size,
    color: body.color,
    img: body.img,
    price: body.price,
  });
  const savedProduct = await product.save();
  return savedProduct;
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};
const getProduct = async (id) => {
  const product = Product.findById(id);
  return product;
};

//more than one product
const getProducts = async (bynewp, DefinedCatagory) => {
  let productsArray;
  if (bynewp) {
    productsArray = await Product.find().sort({ createdAt : -1 }).limit(5);
  } else if (DefinedCatagory) {
    productsArray = await Product.find({
      catagory: {
        $in: [DefinedCatagory],
      },
    });
  } else {
    productsArray = await Product.find();
  }
  return productsArray;
};
module.exports = { AddProduct, deleteProduct, getProduct, getProducts };
