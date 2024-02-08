const { createUser, login } = require("../controllers/AuthUser.controller")
const { tokenVerifiy } = require("../middlewares/AuthJwt")

const route=require("express").Router()

route
     .post("/",createUser)
     .post("/login",login)
module.exports=route