const { getTokenData } = require("../config/jwt.config")

const tokenVerifiy=async(req,res,next)=>{
    try{
        const token=await getTokenData(req.headers["x-aceess-token"])
       
        if(token){
            return next()
        }
        return res.status(401).json({success:false,message:"Invalid token"})

    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

module.exports={
    tokenVerifiy
}