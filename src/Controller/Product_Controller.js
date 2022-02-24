const models = require("../Models");


//Adding new product
const addProduct = (req, res) => {
  let product_data = req.body;
  let img = req.file;

 
  const product = models.ProductModel({
    name:product_data.name,
    description: product_data.description,
    stock: product_data.Stock,
    category: product_data.category,
    company:product_data.company,
    reviews: [],
    colors:product_data.colors,
    images: img.path,
    price: product_data.price,
  });

  product.save(function (err, product) {
    if (err)
    {
      res.send({ans:false,data:"Unable to add product"})
    }
    else{
      res.send({ ans:true,m: "Product added successfully" });
    }
  });
  
};



//Get all the products
const allProduct = async (req, res) => {
  products = await models.ProductModel.find({});
  res.send({ data: products });
};


//get the individual product details
const getProductDetails = async (req, res) => {
  id = req.params.id;
  let product = await models.ProductModel.find({ _id: id });
  product=product[0]
  res.send({ data: product });
};


//adding a review
const addReview = async (req, res) => {
  const review = { text: req.body.review,email:req.body.email };
  const id = req.params.id;
  const product = await models.ProductModel.find({ _id: id });
 
  product[0].reviews = [...product[0].reviews, review];
  await product[0]
    .save((err,result)=>{

      if(err){
        res.send({ans:false,data:"Unable to add review"})
      }
      else{
        res.send({ans:true})
      }
    })
};


//adding stock
const addStock= async (req, res) => {
let id= req.params.id;
let product = await models.ProductModel.find({ _id: id });
product=product[0];
let preStock=product.stock;
product.stock=preStock+req.body.quantity;
await product.save((err,result)=>{
  if(err)
  {
    res.send({ans:false})
  }
  else{
    res.send({ans:true})
  }
})
}


//Stock Removal
const stockRemove=async(req,res) => {
let id=req.params.id;
let quantity=req.body.quantity;
let product = await models.ProductModel.find({ _id: id });
product=product[0]

if(quantity>product.stock)
{  
  res.send({ans:false})
}
else{
  // product.stock=product.stock-Number(quantity);
  let preStock=product.stock;

  product.stock=preStock-quantity
  await product.save((err,result)=>{
    if(err)
    {
      res.send({ans:false})
    }
    else{
      res.send({ans:true})
    }
  })
}
}

//get cart
const getCart=async (req,res)=>{

  let user=await models.UserModel.find({email:req.body.email});

  
  if(user.length!=0)
  {   
    user=user[0]
  
    let cart=await models.ProductModel.find({_id:{$in:user.cart}})
    res.send({ans:true,cart:cart})
  }
  else{

    res.send({ans:false})
  }
}

//Remove from cart
const removeFromCart=async (req,res)=>{
  let id= req.params.id;
  let user=await models.UserModel.find({email:req.body.email});

  
  if(user.length!=0)
  {   
    user=user[0]

    let index=user.cart.indexOf(id)
    let arr1=user.cart.slice(0,index)
    let arr2=user.cart.slice(index+1)
    let final=arr1.concat(arr2);

    user.cart=final;
    user.save(async(err,result)=>{
      if(err)
      {
        res.send({ans:false})
      }
      else{
        let cart=await models.ProductModel.find({_id:{$in:final}})
        res.send({ans:true,cart:cart})
      }
    })
    
  }
  else{

    res.send({ans:false})
  }

}


module.exports.addProduct = addProduct;
module.exports.addReview = addReview;
module.exports.getProductDetails = getProductDetails;
module.exports.allProduct = allProduct;
module.exports.addStock= addStock;
module.exports.stockRemove= stockRemove;
module.exports.getCart= getCart;
module.exports.removeFromCart= removeFromCart;

