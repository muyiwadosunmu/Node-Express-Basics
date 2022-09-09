const { Router, response } = require("express");
const User = require("../database/schemas/User");
const router = Router();
const { hashPassword } = require("../utils/helpers"); 


router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      req.session.user = {
        username,
      };
      res.send(req.session);
    }
  } else res.send(401);
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const userDB = await User.findOne({ $or: [{ username }, { email }] });
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
