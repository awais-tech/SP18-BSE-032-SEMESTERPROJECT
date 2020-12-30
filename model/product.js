var mongoose = require("mongoose");
var Joi = require("@hapi/joi");
var productscheme =mongoose.Schema({
ProductName:String,
ProductPrice:Number,
ProductQuantity:Number,
ProductName:{
    type:String,
    lowercase: true,
   
            
}
});
const Products=mongoose.model("Courses",productscheme);

function validateProduct(data){
    const scheme =Joi.object({
        ProductName:Joi.string().min(3).max(16).required(),
        ProductPrice:Joi.number().min(1).required(),
        ProductQuantity:Joi.number().min(0).required(),
        // Joi.string().email({ tlds: { allow: ['com', 'net','gmail']} }),
    });
    return scheme.validate(data);
}
module.exports.Product = Products;
module.exports.validateProduct = validateProduct;