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
  
    res.send({ status: ans,firstname:current_user.first_name,lastname:current_user.last_name });
  
  
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
    .save()
    .then((data) => {
      res.send({ result: "success" });
      console.log(data);
    })
    .catch((err) => {
      res.send({ result: "failed" });
      console.log(err);
    });

  
};

module.exports.login = login;
module.exports.register = register;
