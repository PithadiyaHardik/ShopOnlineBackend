const models = require("../Models");
const bcryptjs = require("bcryptjs");
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashpass = bcryptjs.hashSync(password);
  const user = await models.UserModel.find({ email: email });
  if(user) {
    const current_user = user[0];
  const pass = current_user.password;
  let ans = bcryptjs.compareSync(password, pass);
  
    res.send({ status: ans });
  
  
  }
  else{
    res.send({status:false})
  }
  
  
};

const register = (req, res) => {
  const user_data = req.body;
  const password = req.body.password;
  const hashpass = bcryptjs.hashSync(password);
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
