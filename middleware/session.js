function sessionAuth(req,res,next){
    res.locals.user=req.session.reg;
    
next();

}

module.exports=sessionAuth;