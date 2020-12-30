
let {validateProduct} = require('../model/product');
let {validateUser} = require('../model/users');

function validateProd(req,res,next){
    let {error}=validateProduct(req.body);
    
    if(error){
      
        var b=error.details[0].message;
        res.render('add',{a:b});
        
    }
    else{
    next();
    }
   
}


function validateU(req,res,next){
    let {error}=validateUser(req.body);
    
    if(error){
        if(error.details[0].type=='string.pattern.base'){
         
            d='Password atleast have 8 character which must include 1 upper case,1 lower case,1 Numeric and 1 special charcater';
            
           return res.render('Users/Register',{c:d,email:req.body.Email,users:req.body.Username, pass:req.body.Password});
        }
        else{
        var b=error.details[0].message;
       
        res.render('Users/Register',{a:b,email:req.body.Email,users:req.body.Username, pass:req.body.Password});
        } 
    }
    else{
    next();
    }
   
}

module.exports.validateProd=validateProd;
module.exports.validateU=validateU;