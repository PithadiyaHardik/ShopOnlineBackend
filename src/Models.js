const mongoose = require("mongoose");
require('dotenv').config()

const uri =process.env.Mongo_uri
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
  role:String,
  phone_number: Number,
  first_name: String,
  middle_name: String,
  last_name: String,
  cart:[{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' }]
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
  stock:{type:Number,min:0},
  company:String,
  colors:String,
  warrenty:Number,
  reviews: [
    {
      text: String,
      email:String,
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


const OrderSchema=mongoose.Schema({
  productId: String,
  email: String,
  phone: String,
  date:{type:Date,default:Date.now},
  paymentId: String,
  address: String,
  status:{type:String,default:"Pending"},
  quantity:Number,
  productName: String,

})

const UserModel = mongoose.model("UserModel", userSchema);
const ProductModel = mongoose.model("ProductModel", productSchema);
const OrderModel=mongoose.model("order",OrderSchema)

module.exports.UserModel = UserModel;
module.exports.ProductModel = ProductModel;
module.exports.OrderModel= OrderModel;
