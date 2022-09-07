const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use((req,res, next) => {
    console.log(`${req.method}:${req.url}`);
    next()
})

app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));

const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 5,
  },
  {
    item: "pop-tarts",
    quantity: 6,
  },
];

app.get("/", (req,res) => {
  res.send(groceryList);
});

app.post("/post", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body)
  res.send(201);
});
