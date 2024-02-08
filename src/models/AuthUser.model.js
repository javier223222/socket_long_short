const { createPool } = require("../config/db.config");

class AuthUser{
    constructor(id,username, email, password){
        this.id=id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

  async  create(){
        const pool=await createPool()
        pool.connect()
        const [result]=await pool.execute("insert into users(username,email,password) values (?,?,?)",[this.username,this.email,this.password])
        if(result.insertId==0){
            throw new Error("Error to create user")
        }
        pool.end()
        this.id=result.insertId
        return result.insertId
    }

 async getPassword() {
    const pool=await createPool()
    pool.connect()
    const [result]=await pool.query("select idUser,username,password from users where username=?",[this.username])
    pool.end()
    if(result.length==0){
        throw new Error("User not found")
    }

    return result[0]
 }


}

module.exports=AuthUser