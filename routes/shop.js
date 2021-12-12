const express = require("express");
const { ShopModel, validShop } = require("../models/shopModel")
const router = express.Router();

router.get("/", async (req, res) => {
    let data = await ShopModel.find({});
    res.json(data)
})


router.post("/", async (req, res) => {
    let valiBody = validShop(req.body)
    if (valiBody.error) {
        return res.status(400).json(valiBody.error.details);
    }
    let data = new validShop(req.body);
    await data.save();
    res.json(data);
})


router.delete("/:idDel", async (req, res) => {
    try {
        let data = await ShopModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})


router.put("/:idEdit", async (req, res) => {
    try {
        let data = await ShopModel.updateOne({ _id: req.params.idEdit }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

module.exports = router;