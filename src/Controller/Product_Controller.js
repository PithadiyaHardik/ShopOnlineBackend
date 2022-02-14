const models = require("../Models");


//Adding new product
const addProduct = (req, res) => {
  product_data = req.body;
  img = req.file;
  console.log(img.path);
  console.log(product_data);
  const product = models.ProductModel({
    name:product_data.name,
    description: product_data.details,
    stock: product_data.stock,
    category: product_data.category,
    company:product_data.company,
    reviews: [],
    colors:product_data.colors,
    images: img.path,
    price: product_data.price,
  });
  product.save(function (err, product) {
    if (err) console.log(err);
  });
  res.send({ m: "Product ended successfully" });
};



//Get all the products
const allProduct = async (req, res) => {
  products = await models.ProductModel.find({});
  res.send({ data: products });
};


//get the individual product details
const getProductDetails = async (req, res) => {
  id = req.params.id;
  console.log(typeof id);
  const product = await models.ProductModel.find({ _id: id });
  res.send({ data: product });
};


//adding a review
const addReview = async (req, res) => {
  const review = { text: req.body.review };
  const id = req.params.id;
  const product = await models.ProductModel.find({ _id: id });
  console.log(product[0]);
  product[0].reviews = [...product[0].reviews, review];
  await product[0]
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send({ m: "Review added" });
};


//adding stock
const addStock= async (req, res) => {
let id= req.params.id;
const product = await models.ProductModel.find({ _id: id });
product=product[0];
let preStock=product.stock;
product.stock=preStock+req.body.quantity;
await product.save()
res.send({m:"Added stock successfully"});
}


module.exports.addProduct = addProduct;
module.exports.addReview = addReview;
module.exports.getProductDetails = getProductDetails;
module.exports.allProduct = allProduct;
module.exports.addStock= addStock;