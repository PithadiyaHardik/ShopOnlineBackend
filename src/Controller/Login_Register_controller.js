const models = require("../Models");
const bcryptjs = require("bcryptjs");



//Login API
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashpass = bcryptjs.hashSync(password);
  const user = await models.UserModel.find({ email: email });
  if(user.length!=0) {
    const current_user = user[0];
  const pass = current_user.password;
  console.log(current_user)
  console.log("HEllo")
  let ans = bcryptjs.compareSync(password, pass);
  
    res.send({ status: ans,firstname:current_user.first_name,lastname:current_user.last_name,phone:current_user.phone_number,role:current_user.role,password:current_user.password });
  
  
  }
  else{
    res.send({status:false})
  }
  
  
};


//Create new account
const register = (req, res) => {
  const user_data = req.body;
  const password = req.body.password;
  const hashpass = bcryptjs.hashSync(password);
  console.log(user_data)
  let new_user = models.UserModel({
    email: user_data.email,
    password: hashpass,
    phone_number: user_data.phone_number,
    first_name: user_data.first_name,
    middle_name: user_data.middle_name,
    last_name: user_data.last_name,
    role:"Regular"
  });
  new_user
    .save((err,result)=>
    {   
      if(err)
      {   
        res.send({result:"failed"})
      }
      else{
        res.send({result:"success"})
      }
    }
    )
    // .then((data) => {
    //   res.send({ result: "success" });
    //   console.log(data);
    // })
    // .catch((err) => {
    //   res.send({ result: "failed" });
    //   console.log(err);
    // });

  
};


//get all user

const allUsers =async (req,res)=>{
  let users=await models.UserModel.find({role:{$ne:"SuperAdmin"}});
  res.send({ans:true,users:users})
}

const updateRole=async (req, res) => {
  let user=await models.UserModel.find({id:req.body.id})

  if(user.length!=0)
  {
    user=user[0];
  user.role=req.body.role

  
  user.save((err,result)=>{
    if(err){
      res.send({ans:false})
    }else{
      res.send({ans:true,data:"Unable to update role"})
    }
  })
  }
  else{
    res.send({ans:false,data:"Invalid Id"})
  }
}


//Admin access
const adminAccess = async (req, res) => {
  let email=req.body.email;
  let password=req.body.admin;
  let user=await models.UserModel.find({email: email, password: password,role:"admin"});
  if(user.length==0)
  {
    res.send({ans:false,data:"ACESS DENIED!!!!"})
  }
  else{
    res.send({ans:true})
  }
}

module.exports.login = login;
module.exports.register = register;
module.exports.allUsers = allUsers;
module.exports.updateRole = updateRole;
