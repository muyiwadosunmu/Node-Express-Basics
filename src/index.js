
// Libraries, express and external ones
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./strategies/local");

// Routes
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRoute = require("./routes/auth");
require("./database");

// Instanciation of express
const app = express();
 
const PORT = 3000;


app.use(cookieParser());
app.use(
  session({
    secret: "qwertyuiopassdfghjklzxcvbnm",
    resave: false,
    saveUninitialized: false,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use("/api/v1/auth", authRoute);
app.use((req, res, next) => {
  if (req.session.user) next(); // Goes down to the next middleware
  else {
    res.sendStatus(401);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketsRoute);


// Loading of server
app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));
 