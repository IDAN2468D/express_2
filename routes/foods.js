const express = require("express");
const { FoodModel, validFood } = require("../models/foodModel")
const router = express.Router();


router.get("/", async (req, res) => {
    let data = await FoodModel.find({});
    res.json(data)
})

router.post("/", async (req, res) => {
    let valiBody = validFood(req.body)
    if (valiBody.error) {
        return res.status(400).json(valiBody.error.details);
    }
    let food = new FoodModel(req.body);
    await food.save();
    res.json(food);
})



router.delete("/:idDel", async (req, res) => {
    try {
        let data = await FoodModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})



router.put("/:idEdit", async (req, res) => {
    try {
        let data = await FoodModel.updateOne({ _id: req.params.idEdit }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

module.exports = router;