const models = require("./Models");

const adminAccess=async (req,res,next) =>{
    let email=req.body.email;
    let password=req.body.admin;
    let user=await models.UserModel.find({email:email,password:password,role:"admin"});
    if(user.length!=0)
    {
        next();
    }
    else{
        res.send({ans:false,data:"Access denied!!!!!!!!!!"})
    }

    

}

const superAdminAccess=async(req,res,next)=>{
    let email=req.body.email;
    let password=req.body.admin;
    
    let user=await models.UserModel.find({email:email,password:password,role:"SuperAdmin"});
    

    if(user.length!=0)
    {
        next();
    }
    else{
        res.send({ans:false,data:"Access denied!!!!!!!!!!"})
    }


}
module.exports.adminAccess=adminAccess
module.exports.superAdminAccess=superAdminAccess
