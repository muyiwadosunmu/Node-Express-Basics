const express = require("express");
const groceriesRoute = require("./routes/groceries");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use((req,res, next) => {
    console.log(`${req.method}:${req.url}`);
    next()
});
app.use(groceriesRoute);

app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));






