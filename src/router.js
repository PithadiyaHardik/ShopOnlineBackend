const express = require("express");
const login_register = require("./Controller/Login_Register_controller");
const product = require("./Controller/Product_Controller");
const payment= require("./Controller/Payment_Controller");
const order= require("./Controller/OrderController")
const multer = require("multer");
const path = require("path");

const storageSettings = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
// const storageSettings = multer.diskStorage({
//   // Destination to store image
//   destination: "images",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const upload = multer({ storage: storageSettings });
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/login", login_register.login);

router.post("/register", login_register.register);

router.post("/addProduct", upload.single("image"), product.addProduct);

router.get("/allProduct", product.allProduct);

router.get("/getProductDetails/:id", product.getProductDetails);

router.post("/addReview/:id", product.addReview);

router.post("/addStock/:id",product.addStock)

router.post("/generateOrderId",payment.generateOrderId)

router.post("/stockRemove/:id",product.stockRemove)

router.post("/addOrder",order.addOrder)

router.post("/addCart",order.addCart)

router.post("/getCart",product.getCart)

router.post("/removeFromCart/:id",product.removeFromCart)



module.exports = router;
