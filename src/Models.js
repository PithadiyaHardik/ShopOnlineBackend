const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Hardik:Hardik123@cluster0.yiyhv.mongodb.net/shopping_website?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: Number,
  first_name: String,
  middle_name: String,
  last_name: String,
});
const productSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Name:{
    type:String,
  },
  location: String,
  reviews: [
    {
      text: String,
      pDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  Category: String,
  Quantity:Number, 
  images: String,
  price: Number,
});

const UserModel = mongoose.model("UserModel", userSchema);
const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports.UserModel = UserModel;
module.exports.ProductModel = ProductModel;
