const Razorpay=require('razorpay')
let options={
    key_id:"rzp_test_DnK1IvY3O5N98N",
    key_secret:"o58moAgKrOw9VhzPgSWSYngu"
}

//Key_ID
//rzp_test_DnK1IvY3O5N98N
//Key_secret
//o58moAgKrOw9VhzPgSWSYngu
const razor=new Razorpay(options);

//generate order id
const generateOrderId=(req,res)=>{
    var options2={
        amount:req.body.amount,
        currency:"INR"
    }
    razor.orders.create(options2,(err,order)=>{
        console.log(err);
        console.log(order);
        if(err)
        {
            res.send({m:"Try again"})
        }
        else{
            res.send({order:order})
        }
    
    });
    



}


//Save order details
// const saveOrder=()=>{


// }



module.exports.generateOrderId= generateOrderId;