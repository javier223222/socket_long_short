const { getTokenData } = require("../config/jwt.config")
const Foro = require("../models/Foro.model")
const ForoInteraction = require("../models/ForoInteraction.model")
const UserMedia = require("../models/UserMedia.model")

let peticiones=[]

const newMessageForo=async(req,res)=>{
  const {idforo}=req.query
  peticiones.push({res,idforo})
  req.on("close",()=>{
    peticiones.filter(x=>x.idforo!=idforo)
  })
}

const answernewMessage=(data,idforo)=>{
   for (let index = 0; index < peticiones.length; index++) {
    const element = peticiones[index];
    if(element.idforo==idforo){
        element.res.status(200).json(data)
    }
    
   }

   peticiones=peticiones.filter(x=>x.idforo!=idforo)
}
const updateDescripcionForo=async(req,res)=>{
    try{
        const token=await getTokenData(req.headers["x-aceess-token"])
        const {idUser}=token.data
        const {idforo,descripcion}=req.body
        console.log(idforo,descripcion,idUser)
        const foro=new Foro(idforo,null,descripcion,idUser)
        const created=await foro.getCreatedForo()
        if(created==null){
            return res.status(401).json({
                success:false,
                message:"unathorizaded"
            })
        }

        await foro.updateDescripcion()

        return res.status(200).json({
            success:true,
            message:"foro updated"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error add foro descripcion"
        })
    }
}


const getAllMessage=async(req,res)=>{
    try{
     const {idforo}=req.query
     const foro=new ForoInteraction(idforo,null,null)
     const result=await foro.getMessage()
     res.status(200).json({
        success:true,
        message:"all message",
        result:result.length==0?[]:result
    })

    }catch(error){
     res.status(500).json({
            success:false,
            message:"error to get all message"
        })
    }
}

const addMessage=async(req,res)=>{
    try{
        
        
     const token=await getTokenData(req.headers["x-aceess-token"])
     const {idUser,username}=token.data
     const {idforo,message}=req.body
     console.log(idUser,username,idforo,message)
     const foro=new ForoInteraction(idforo,idUser,message)
     const imageMedia=new UserMedia(null,idUser,null,null)
     const result=await imageMedia.getImage()
     const created=await foro.saveMessage()
     const respuesta={
        idforomessage:"no provide",
        idforo:idforo,
        idUser:idUser,
        username:username,
        imageUrl:result?.imageUrl,
        message:message


     }
     answernewMessage(respuesta,idforo)
     return res.status(201).json({
        success:true,
        message:"message send correctly"
     })

    }catch(error){
       return res.status(500).json({
            success:false,
            message:error.message

        })
    }
}

const getForosDescription=async(req,res)=>{
    try{
        const {idforo}=req.query
        const foro=new Foro(idforo,null,null,null)
        const result=await foro.getDescripcionOfForo()
        
        return res.status(200).json({
            success:true,
            message:"foro description",
            result:result?.descripcionForo
        })

        

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error to get foros description",
            error:error.message
        })
    }
}


module.exports={
    newMessageForo,
    updateDescripcionForo,
    getAllMessage,
    addMessage,
    getForosDescription
}
