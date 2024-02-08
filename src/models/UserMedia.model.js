const { createPool } = require("../config/db.config")

class UserMedia{
   constructor(idUserImage,iduser,imageUrl,idUrl){
    
    this.idUserImage=idUserImage,
    this.iduser=iduser,
    this.imageUrl=imageUrl,
    this.idUrl=idUrl
   }
   async addImage(){
    const pool=await createPool()
    pool.connect()
    const [result]=await pool.execute(`insert into userimage(idUser,imageUrl,idUrl) values(?,?,?)`,[this.iduser,this.imageUrl,this.idUrl])
    if(result.insertId==0){
        throw new Error("Error to add image")
    }
    pool.end()
   }

   async updateImage(){
   const pool=await createPool()
   pool.connect()
    const [result]=await pool.execute("update userimage set imageUrl=?,idUrl=? where idUserImage=?",[this.imageUrl,this.idUrl,this.idUserImage])
    if(result.affectedRows==0){
        throw new Error("Error to update image")
    }
    pool.end()

   }

  async getImage(){
    const pool=await createPool()
    pool.connect()
    const [result]=await pool.execute("select idUserImage,idUser,imageUrl from userimage where idUser=?",[this.iduser])
    if(result.length==0){
       return null
    }
    return result[0]
    
  }
}

module.exports=UserMedia