const { createPool } = require("../config/db.config");

class ForoMedia{
    constructor(id, idForo, idMedia,urlImage,idUrlImage){
        this.id = id;
        this.idForo = idForo;
        this.idMedia = idMedia;
        this.urlImage = urlImage;
        this.idUrlImage = idUrlImage;
    }
   

    async addImage(){
       const pool=await createPool()
        pool.connect()

        const [result]=await pool.execute("insert into imageforo(idforo,urlImage,idUrlImage) values(?,?,?) ",[this.idForo,this.urlImage,this.idUrlImage])
        if(result.insertId==0){
            throw new Error("Error to add image")
        }
        pool.end()
        this.id=result.insertId
    }

    async updateImage(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.execute("update imageforo set urlImage=?,idUrlImage=? where idforo=?",[this.urlImage,this.idUrlImage,this.idForo])
         pool.end()
        if(result.affectedRows==0){
            throw new Error("Error to update image")
        }
    }

    async getImages(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.execute("select idImageForo,idforo,urlImage,idUrlImage  from imageforo where idforo=?",[this.idForo])
        if(result.length==0){
            throw new Error("Error to get images")
        }
        pool.end()
        return result
    }

}
module.exports=ForoMedia