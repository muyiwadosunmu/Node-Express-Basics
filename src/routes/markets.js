const { Router } = require("express");

const router = Router()
const superMarkets = [
    {
        id: 1,
        store: "Whole Foods",
        miles: 0.6,
    },
    {
        id: 2,
        store: "Trader Joes",
        miles: 2.5,
    },
    {
        id: 3,
        store: "Albertsons",
        miles:2.8
    },
    {
        id: 4,
        store: "Trader Jones",
        miles:3.5
    },
    {
        id: 3,
        store: "Albertsons",
        miles:1.8
    }
];


router.get('/', (req,res) => {
    const {miles} = req.query;
    const parsedMiles = parseInt(miles);
    if (!isNaN(parsedMiles)) {
        const filteredStores = superMarkets.filter((s) => s.miles <= parsedMiles);
        res.send(filteredStores);
    } else res.send(superMarkets);
})



module.exports = router;

