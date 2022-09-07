const { Router } = require("express");

const router = Router()
const superMarkets = [
    {
        store: "Whole Foods",
    },
    {
        store: "Trader Joes",
    },
    {
        store: "Albertsons",
    }
];

router.get('/', (req,res) => {
    res.send(superMarkets);
})



module.exports = router;

