const { createPool } = require("../config/db.config")

class Foro{
    constructor(idforo,nameforo,descripcionForo,iduser){
        this.idforo=idforo
        this.nameforo=nameforo,
        this.descripcionForo=descripcionForo,
        this.iduser=iduser
    }

    async create(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.execute("insert into foro(nameForo,descripcionForo,idUser) values (?,?,?)",[this.nameforo,this.descripcionForo,this.iduser])
        if(result.insertId==0){
            throw new Error("Error to create foro")
        }
        pool.end()
        this.idforo=result.insertId
       return this.idforo
    }


    async updateDescripcion(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.execute("update foro set descripcionForo=? where idforo=?",[this.descripcionForo,this.idforo])
        pool.end()
        if(result.affectedRows==0){
            throw new Error("Error to update foro")
        }
        



    }


     async getAllForo(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.query("select idforo,nameForo,descripcionForo,idUser,created_at from foro order by created_at desc")
        pool.end()
        return result
    }

    async getCreatedForo(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.query(`select idforo from foro where idUser=? and idforo=?`,[this.iduser,this.idforo])
        if(result.length==0){
            return null
        }
        pool.end()
        return result[0]
    }
    async getDescripcionOfForo(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.query("select descripcionForo from foro where idforo=?",[this.idforo])
        pool.end()
        if(result.length==0){
            return null
        }
        return result[0]
     
    }
    
}
module.exports=Foro