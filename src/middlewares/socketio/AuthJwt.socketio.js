require("dotenv").config()
const jwt=require("jsonwebtoken")
const secreetJWT=process.env.TOKEN


const verify=(socket,next)=>{
    try{
        const tokenuser=socket.handshake.auth.token
        
    
        
         jwt.verify(tokenuser,secreetJWT,(err,decoded)=>{
            if(err){
                next(err)
            }

            socket.user=decoded
            next()
         })
      
    }catch(e){
        next(e)
    }
    
}

module.exports={
    verify
}