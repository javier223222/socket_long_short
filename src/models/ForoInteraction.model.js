const { createPool } = require("../config/db.config")

class ForoInteraction{
    constructor(idforo,iduser,message){
     this.idforo=idforo,
     this.iduser=iduser,
     this.message=message


    }
   

    async saveMessage(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.execute("insert into messageforo(idforo,idUser,message) values (?,?,?)",[this.idforo,this.iduser,this.message])
        if(result.affectedRows==0){
          throw new Error("message not saved")
        }

       pool.end()
    
    }
    async getMessage(){
      const pool=await createPool()
      pool.connect()
      const [result]=await pool.query(`select idforomessage,mef.idforo,mef.idUser,us.username,usim.imageUrl,mef.message from users us inner join messageforo mef on us.idUser=mef.idUser
      and mef.idforo=? left join userimage usim on us.idUser=usim.idUser order by mef.created_at asc`,[this.idforo])
      pool.end()
      if(result.length==0){
        return []
      }
      return result
      
    }

  
}


module.exports=ForoInteraction