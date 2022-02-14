const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Hardik:Hardik123@cluster0.yiyhv.mongodb.net/shopping_website?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//User model schema
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

//Product schema schema
const productSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  name:{
    type:String,
  },
  stock:Number,
  colors:[String],
  warrenty:Number,
  reviews: [
    {
      text: String,
      pDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  category: String,
  images: String,
  price: Number,
});

const UserModel = mongoose.model("UserModel", userSchema);
const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports.UserModel = UserModel;
module.exports.ProductModel = ProductModel;
