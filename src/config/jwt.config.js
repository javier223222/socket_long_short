require("dotenv").config()
const jwt =require("jsonwebtoken")


const getToken=async(payload)=>{
    return jwt.sign({
        data:payload
    },`${process.env.TOKEN}`,{expiresIn:"7h"})

}

const getTokenData=async(token)=>{

    let data=null
        jwt.verify(token,`${process.env.TOKEN}`,(err,decoded)=>{
            if(err){
                console.log(`Error: ${err}`)
            }else{
                data=decoded
            }
            
        })

        return data

        
        
}

module.exports={
    getToken,
    getTokenData
}