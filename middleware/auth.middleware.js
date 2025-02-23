const authMw = async(req,res,next)=>{
    try {
        let token = req.headers?.authorization?.split(" ")[1];
        if(!token){
            res.status(403).json({msg:"Token missing"});
        }
        else{
            var decoded = jwt.verify(token,JWT_KEY);
        }
        if(decoded){
            req.body.userId = decoded.userId;
            next();
        }
        else{
            res.status(403).json({msg:"Permission denied"})
        }
    } catch (error) {
        console.log(err)
        res.status(500).json({msg:"Error Occured"});
    }
    module.exports = authMw;
}
