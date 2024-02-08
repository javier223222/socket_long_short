const bcrypt=require("bcrypt")
const AuthUser = require("../models/AuthUser.model")
const { getToken } = require("../config/jwt.config")
const createUser=async(req,res)=>{
   try{
     const {username,email,password}=req.body
     let encrypPassword=bcrypt.hashSync(password,10)
     const userAuth=new AuthUser(null,username,email,encrypPassword)
    if(!username || !email || !password){
        return res.status(400).json({success:false,message:"Missing fields"})
    }
    await userAuth.create()

    return res.status(200).json({
        success:true,
        message:"User created with username "+ userAuth.username,
    })
   }catch(err){
      return res.status(500).json({success:false,message:err.message})
   }
}

const login=async(req,res)=>{
    try{
      const {usernameofUser,passwordofUser}=req.body
      if(!usernameofUser || !passwordofUser){
          return res.status(400).json({success:false,message:"Missing fields"})
      }
      

      const userAuthj=new AuthUser(null,usernameofUser,null,null)
      
      const {idUser,username,password}=await userAuthj.getPassword()
      
 
    if(!bcrypt.compareSync(passwordofUser,password)){
        return res.status(401).json({success:false,message:"Invalid password"})
    }
    const token=await getToken({idUser,username})
      return res.status(200).json({
          success:true,
          message:"User logged with username "+ username,
          token:token
      })
    }catch(error){
        return res.status(500).json({
            success:"Error to login",
            error:error.message
        })
    }
}


module.exports={
    createUser,
    login
}