var express = require('express');
let {Product,validateProduct} = require('../model/product');
let {validateProd}=require('../middleware/validateProducts');
let {sessioncheck,sessioncheckAdmin}=require('../middleware/sessioncheck');
var router = express.Router();

/* GET home page. */
router.get('/',sessioncheckAdmin, async function(req, res, next) {  // Admin view
  let products=await Product.find();
  console.log(req.session.reg);
  
  res.render('productview',{title:'Products',products});
});


router.get('/Aboutus', async function(req, res, next) {  // Admin view

  
  res.render('About');
});






router.get('/OurProducts',sessioncheck, async function(req, res, next) {
  let products=await Product.find();
  console.log(req.session.reg);                             //User View
  
  res.render('Productlist',{title:'Our Products',products});
});








router.get('/OurProducts/cart',sessioncheck, async function(req, res, next) {
   let product =await Product.findById(req.params.id);
 let cart=[];
                                                                   //user view
 cart=req.cookies.cart;
 if(!cart){
   cart=[];
   
 }


 res.render('cart',{cart});
 
});





router.get('/OurProducts/cart/:id',sessioncheck, async function(req, res, next) {

  let product =await Product.findById(req.params.id);
 let cart=[];
 
 if(req.cookies.cart){                              //User View
   cart=req.cookies.cart;}
   cart.push(product);
   res.cookie('cart',cart);
     res.redirect('/product/OurProducts');
 

   
 });



 router.get('/OurProducts/PlaceOrder',sessioncheck, async function(req, res, next) {

  
 let cart=[];
 
 if(req.cookies.cart){                              //User View
   cart=req.cookies.cart;
   console.log(cart[0].ProductName);
  }
cart.forEach(myFunction);
  function myFunction(item, index) {
    console.log(item.ProductName);
  }
  
  
     res.redirect('/product/OurProducts');
 

   
 });






 router.get('/OurProducts/cart/remove/:id', sessioncheck,async function(req, res, next) {

 
 let cart=[];

  if(req.cookies.cart){
   cart=req.cookies.cart;
  }
  cart.splice(cart.findIndex(function(cook){
    return cook._id==req.params.id;
    }),1);
 
    res.cookie('cart',cart);
  res.redirect("/product/OurProducts/cart");

   
 });

   







 router.get('/Edit/:id',sessioncheckAdmin, async function(req, res, next) {

 try{
   let product =await Product.findById(req.params.id);
   console.log(product);
 if(!product){
  var erro='Please enter correct formet for id';
   return res.render('index',{erro});
  }
 return res.render('edit',{product});                  //Admin 
  }
  catch(err){
    var erro='Please enter correct formet for id';
    return res.render('index',{erro});
    
   }
 
   
 });





router.get('/add',sessioncheckAdmin,async function(req, res, next) {
  res.render('add');
}); 





router.post('/add',sessioncheckAdmin,validateProd, async function(req, res, next) {
 // product.Prouductname=req.body.Prouductname  when we write different names then use this
 let ProductName = await Product.findOne({
  ProductName:req.body.ProductName
});
if(!ProductName){
  let product=new Product(req.body);
  await product.save();
  res.redirect('/product');
}
else{
  var a='Product is already Available';
  res.render('add',{a});
}
});

router.get('/delete/:id',sessioncheckAdmin, async function(req, res, next) {

  let product =await Product.findByIdAndDelete(req.params.id);
  res.redirect('/product');
   
 });


 router.post('/Edit/:id',sessioncheckAdmin, async function(req, res, next) {
 
  let product =await Product.findById(req.params.id);  //1st way is name is same
  product.ProductName=req.body.ProductName;
  product.ProductPrice=req.body.ProductPrice;    //2nd way to do this
  product.ProductQuantity=req.body.ProductQuantity;
 
  await product.save();
  res.redirect('/product');

 
   
 });
 
module.exports = router;
