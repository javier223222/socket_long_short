const { uploadImage } = require("../config/cloundinary.config")
const UserMedia = require("../models/UserMedia.model")
const fs=require("fs-extra")

const uploadImageUser=async(req,res)=>{
    try{
        const myto=await getTokenData(req.headers["x-access-token"])
        const idTosearch=myto.data.idUser

        const mediaTwo=new UserMedia(null,idTosearch,null,null)
        const mediaexits=await mediaTwo.getImage()
        if(mediaexits!=null){
         const token=await getTokenData(req.headers["x-access-token"])
        const {idUser}=token.data
        const {idusermedia}=req.query
        
        if(req.files?.profileImage){
         const imagen=await uploadImage(req.files.profileImage.tempFilePath)
         const userImage=new UserMedia(idusermedia,idUser,imagen.secure_url,imagen.public_id)

         await userImage.updateImage()
     
        await fs.unlink(req.files.profileImage.tempFilePath)
         return res.status(201).json({message:"Image uploaded successfully"})
        }

        return res.status(400).json({message:"Image not found"})
        }
        const token=await getTokenData(req.headers["x-access-token"])
        const {idUser}=token.data
        
        if(req.files?.profileImage){
         const imagen=await uploadImage(req.files.profileImage.tempFilePath)
         const userImage=new UserMedia(null,idUser,imagen.secure_url,imagen.public_id)
         await userImage.addImage()
      
        await fs.unlink(req.files.profileImage.tempFilePath)
         return res.status(201).json({message:"Image uploaded successfully"})
        }

        return res.status(400).json({message:"Image not found"})


       


    }catch(e){
      return res.status(500).json({message:e.message})
    }
}



module.exports={
    uploadImageUser,
    
}