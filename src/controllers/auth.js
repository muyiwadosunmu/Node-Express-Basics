 const User = require('../database/schemas/User');
 const { hashPassword }  = require('../utils/helpers');


 async function authRegisterController(req, res) {
    const { email } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      res.status(400);
      res.send({ msg: "User already exists" });
    } else {
      const password = hashPassword(req.body.password);
      console.log(password);
      const newUser = await User.create({ password, email });
      res.status(201);
      return newUser
     
    }
  };

  

  module.exports = { authRegisterController, hashPassword };