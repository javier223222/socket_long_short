const { addMessage, getAllMessage, updateDescripcionForo, newMessageForo, getForosDescription } = require("../controllers/Foro.controller")
const { tokenVerifiy } = require("../middlewares/AuthJwt")

const router=require("express").Router()

router
     .post("/",tokenVerifiy,addMessage)
     .get("/",tokenVerifiy,getAllMessage)
     .patch("/",tokenVerifiy,updateDescripcionForo)
     .get("/newmessages",tokenVerifiy,newMessageForo)
     .get("/description",tokenVerifiy,getForosDescription)


module.exports=router