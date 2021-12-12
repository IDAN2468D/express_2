const express = require("express");
const bcrypt = require("bcrypt");
const {
    UserModel,
    validUser,
    validLogin,
    genToken
} = require("../models/userModel");
const { authToken } = require("../auth/authToken");
const router = express.Router();


router.get("/userInfo", authToken, async (req, res) => {
    let user = await UserModel.findOne({ _id: req.tokenData._id }, { pass: 0 })
    res.json(user)
})

router.get("/", async (req, res) => {
    let data = await UserModel.find({})
    res.json(data)
})


router.post("/", async (req, res) => {
    let valiBody = validUser(req.body)
    if (valiBody.error) {
        return res.status(400).json(valiBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.pass = await bcrypt.hash(user.pass, 10);
        await user.save();
        user.pass = "*****";
        res.json(user);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err: "Email already in system or anothe problem" })
    }
})




router.post("/login", async (req, res) => {
    let valiBody = validLogin(req.body)
    if (valiBody.error) {
        return res.status(400).json(valiBody.error.details);
    }
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json({ msg: "User not found" });
    }
    let passValid = await bcrypt.compare(req.body.pass, user.pass);
    if (!passValid) {
        return res.status(401).json({ msg: "Pasword worng" })
    }
    let newToken = genToken(user._id);
    res.json({ token: newToken });
})
module.exports = router;