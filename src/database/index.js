// mongoose.connect("mongodb://username;password@localhost:27017/expressjs_tutorial")
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/expressjs_tutorial")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
