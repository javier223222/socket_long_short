const { uploadImageUser } = require("../controllers/User.controller")
const { tokenVerifiy } = require("../middlewares/AuthJwt")

const router=require("express").Router()

router
     .post("/",tokenVerifiy,uploadImageUser)

module.exports=router