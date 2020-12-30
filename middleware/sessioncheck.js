function sessioncheck(req,res,next){
   if(req.session.reg){
next();
   }
   else{
      if(req.session.adm){
         return res.redirect("/product");
      }
      else{
      req.session.reg=null;
      req.session.adm=null;
       return res.redirect("/users/Login");
      }
   }
}
function sessioncheckAdmin(req,res,next){
   if(req.session.adm){
next();
   }
   else{
      if(req.session.reg){
         return res.redirect("/product/OurProducts");
      }
      else{
      req.session.reg=null;
      req.session.adm=null;
       return res.redirect("/users/Login");
      }
   }
}
module.exports.sessioncheck=sessioncheck;
module.exports.sessioncheckAdmin=sessioncheckAdmin;