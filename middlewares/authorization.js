
const jwt=require("jsonwebtoken")

const authontication=function(req,res,next){
    const  authHeader=req.headers.authorization;;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(404).json({msg:"invalid token"})
    }
    const toke=authHeader.split(" ")[1];
    try{
        const payload=jwt.verify(toke,process.env.JWT_SECRET);
        req.user={userId:payload.userId,name:payload.name}
        next();
    }catch(error) {
        res.status(500).json({error})
    }
} 


module.exports=authontication;