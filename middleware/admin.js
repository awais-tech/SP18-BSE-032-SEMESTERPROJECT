function sessionadmin(req,res,next){
    res.locals.admin=req.session.adm;
    console.log(res.locals.admin);
next();

}

module.exports=sessionadmin;