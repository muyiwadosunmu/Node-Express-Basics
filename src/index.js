// Libraries, express and external ones
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");

// require("./strategies/local");
require("./strategies/discord");
require("./database");

// Routes
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRoute = require("./routes/auth");


// Instanciation of express
const app = express();
 
const PORT = 3000;
// const memoryStore = new session.MemoryStore();



// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(
  session({
    secret: "qwertyuiopassdfghjklzxcvbnm",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:'mongodb://localhost:27017/expressjs_tutorial'
    })
  })
);


app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});


app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/v1/auth", authRoute); 
app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketsRoute);



// Loading of server
app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));
 
