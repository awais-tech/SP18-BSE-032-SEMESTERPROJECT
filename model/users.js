var mongoose = require("mongoose");
var Joi = require("@hapi/joi");
var productscheme =mongoose.Schema({
Email:String,
Username:String,
Password:String,
role:{
    type:String,
    default:'user',
},
});


const Register=mongoose.model("Users",productscheme);

function validateuser(data){
    const scheme =Joi.object({
        Email:Joi.string().email({ tlds: { allow: ['com', 'net','gmail']} }),
        Username:Joi.string().min(1).required(),
        Password:Joi.string().min(0).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
       
       
    });
    return scheme.validate(data);
}
module.exports.Register = Register;
module.exports.validateUser=validateuser;