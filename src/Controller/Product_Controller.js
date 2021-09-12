const models = require("../Models");

const addProduct = (req, res) => {
  product_data = req.body;
  img = req.file;
  console.log(img.path);
  console.log(product_data);
  const product = models.ProductModel({
    email: product_data.email,
    displayNAme:product_data.displayName,
    description: product_data.details,
    location: product_data.location,
    reviews: [],
    images: img.path,
    price: product_data.price,
  });
  product.save(function (err, product) {
    if (err) console.log(err);
  });
  res.send({ m: "Product ended successfully" });
};

const allProduct = async (req, res) => {
  products = await models.ProductModel.find({});
  res.send({ data: products });
};
const getProductDetails = async (req, res) => {
  id = req.params.id;
  console.log(typeof id);
  const product = await models.ProductModel.find({ _id: id });
  res.send({ data: product });
};
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

module.exports.addProduct = addProduct;
module.exports.addReview = addReview;
module.exports.getProductDetails = getProductDetails;
module.exports.allProduct = allProduct;
