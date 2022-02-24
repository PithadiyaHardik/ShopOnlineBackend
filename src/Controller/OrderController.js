const models = require("../Models");
const addOrder=async (req,res)=>{
    const order=models.OrderModel({
        email:req.body.email,
        phone:req.body.phone,
        paymentId:req.body.paymentid,
        address:req.body.address,
        productId:req.body.productId,
        quantity:req.body.quantity,
        productName:req.body.productName
    })
    order.save((err,result)=>{
        if(err){
            res.send({ans:false})
        }
        else{
            res.send({ans:true})
        }
    })
}



//Get all Order

const allOrders=async(req,res)=>{
    let orders=await models.OrderModel.find({});
    res.send({ans:true,orders:orders});

}


const addCart=async (req,res)=>{

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


const getUsersOrders=async(req,res)=>{
    
    let user=await models.UserModel.find({email:req.body.email})
    if(user.length!=0)
    {
        let orders=await models.OrderModel.find({email:req.body.email})
        res.send({ans:true,orders:orders})
    }
    else{
        res.send({ans:false})
    }

}

const updateStatus=async (req,res)=>{

    let id=req.body.id;
    let status=req.body.status;
    let order=await models.OrderModel.find({_id:id});
    order=order[0];
    order.status=status;
    order.save((err,result)=>{
        if(err){
            res.send({ans:false})
        }
        else{
            res.send({ans:true})
        }
    })





}


module.exports.addOrder=addOrder
module.exports.addCart=addCart
module.exports.getUsersOrders=getUsersOrders
module.exports.allOrders=allOrders
module.exports.updateStatus= updateStatus
