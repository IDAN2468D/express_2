const mongoose = require("mongoose");
const Joi = require("joi");

const shopSchema = new mongoose.Schema({
    name: String,
    image: String,
    cal: Number,
    price: Number
})

const ShopModel = mongoose.model("shops", shopSchema);

exports.ShopModel = ShopModel;


exports.validShop = (_bodyData) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        image: Joi.string().min(2).max(300),
        cal: Joi.number().min(1).max(9999).required(),
        price: Joi.number().min(1).max(9999).required(),
    })
    return joiSchema.validate(_bodyData);
}