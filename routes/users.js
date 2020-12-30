var express = require('express');
let {Register,validateUser} = require('../model/users');
let {validateProd, validateU}=require('../middleware/validateProducts');
let {sessioncheck,sessioncheckAdmin}=require('../middleware/sessioncheck');
var router = express.Router();

/* GET users listing. */
router.post('/register', validateU, async function(req, res, next) {
 let user=await Register.findOne({ 
   Username:req.body.Username
  })
  if (!user){
  let register=new Register(req.body);
  await register.save();
  res.redirect('/users/Login');
  }
  else {
    debugger;
    var b='Ops! User with  Username already Exist  Username';
    res.render("Users/Register",{a:b,email:req.body.Email,users:req.body.Username, pass:req.body.Password});
  }
});






router.get('/register',  async function(req, res, next) {

  res.render("Users/Register");
});


router.get('/Login',  async function(req, res, next) {

  res.render("Users/Login");
});




router.get('/LogOut',  async function(req, res, next) {

  req.session.reg=null;
  req.session.adm=null;
  res.clearCookie("cart");
  res.redirect('/');
});

router.post('/Login', async function(req, res, next) {
  let register = await Register.findOne({
    Username:req.body.Username
    ,Password:req.body.Password
  });

  if(register){
  if(register.role=='user'){
    req.session.reg=register;
    res.clearCookie("cart");
    return res.redirect('/product/OurProducts');
  }
  else if(register.role!='user'){
    req.session.adm=register;
    return res.redirect('/product');
  }
 
}else{
  
    var err='Username or Password is invalid';
    res.render('Users/Login',{err});
  
  }
});








//Show User

router.get('/RegisterUser',sessioncheckAdmin,  async function(req, res, next) {

  let RegisteredUser=await Register.find();
  console.log(RegisteredUser);
  res.render('Users/RegisteredUser',{title:'Products',RegisteredUser});
});

 

router.get('/RegisterUser/Edit/:id',sessioncheckAdmin, async function(req, res, next) {

  
    let RegisterUser=await Register.findById(req.params.id);
  
  
  return res.render('Users/EditUser',{RegisterUser});                  //Admin 
   
  
    
  });


  router.post('/RegisterUser/Edit/:id', validateU,sessioncheckAdmin,async function(req, res, next) {
     
  
    let users=await Register.findOne({ 
      Username:req.body.Username
     })
     if (!users){
      let Registered =await Register.findOneAndUpdate(req.params.id,req.body); 
     await Registered.save();
     res.redirect('/users/RegisterUser');
     }
     else {
      console.log(users);
       var err='Ops! User with  Username already Exist ';
       res.render("error",{error:err});
     }
   });



   router.get('/RegisterUser/delete/:id',sessioncheckAdmin, async function(req, res, next) {

    let Registered =await Register.findByIdAndDelete(req.params.id);
    res.redirect('/users/RegisterUser');
     
   });
 
module.exports = router;
