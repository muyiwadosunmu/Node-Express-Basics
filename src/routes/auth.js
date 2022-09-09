const { Router, response } = require("express");
const User = require("../database/schemas/User");
const router = Router();
const { hashPassword, comparePassword } = require("../utils/helpers");


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const userDB = await User.findOne({ email });
  if (!userDB) return res.sendStatus(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    console.log("Authentication Successful");
    req.session.user = userDB;
    return  res.sendStatus(200);
  } else {
    console.log("Authentication Failed");
    return res.sendStatus(401);
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: "User already exists" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ username, password, email });
    res.sendStatus(201);
  }
});

module.exports = router;
