const { Router, response } = require("express");
const passport = require("passport");
const { authRegisterController } = require("../controllers/auth");
const User = require("../database/schemas/User");
const router = Router();
const { hashPassword, comparePassword } = require("../utils/helpers");

/* router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const userDB = await User.findOne({ email });
  if (!userDB) return res.sendStatus(401);  //Unauthorized
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    console.log("Authentication Successful");
    req.session.user = userDB;
    return  res.sendStatus(200);
  } else {
    console.log("Authentication Failed");
    return res.sendStatus(401);
  }
}); */

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.sendStatus(200);
});

router.post("/register", authRegisterController)

router.get("/discord", passport.authenticate("discord"), (req, res) => {
  res.send(200);
});

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {

});

module.exports = router;
