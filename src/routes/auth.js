const { Router, response } = require("express");
const User = require("../database/schemas/User");
const router = Router();
const { hashPassword } = require("../utils/helpers");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
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
