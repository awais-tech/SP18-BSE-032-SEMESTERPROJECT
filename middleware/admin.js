function sessionadmin(req,res,next){
    res.locals.admin=req.session.adm;
    console.log(res.locals.admin);
    if (req.session.adm){
    console.log(res.locals.admin.Username);
    }
next();

}

module.exports=sessionadmin;