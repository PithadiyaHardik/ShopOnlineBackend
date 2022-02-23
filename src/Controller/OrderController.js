const models = require("../Models");
const addOrder=async (req,res)=>{

    const order=models.OrderModel({
        email:req.body.email,
        phone:req.body.phone,
        paymentId:req.body.paymentid,
        address:req.body.address,
        productId:req.body.productid,
        quantity:req.body.quantity
    })
    await order.save().then(r=>res.send({ans:true})).catch(console.log("error"))
}


const addCart=async (req,res)=>{
    console.log("Add cart")
    let user=await models.UserModel.find({email:req.body.email},)
    user=user[0]
    if(user.cart.includes(req.body.id))
    {
        res.send({ans:false,data:"Already present in cart"})
    }
    else{
    user.cart=[...user.cart,req.body.id]

    user.save((err,result)=>{
        if(err)
        {   
            res.send({ans:false,data:"Network error try again"})
        }
        else{
            res.send({ans:true})
        }
    })
}


}


module.exports.addOrder=addOrder
module.exports.addCart=addCart