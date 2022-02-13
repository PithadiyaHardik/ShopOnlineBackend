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
  
    res.send({ status: ans });
  
  
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
  });
  new_user
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  res.send({ result: "success" });
};

module.exports.login = login;
module.exports.register = register;
