require("dotenv").config()
const mysql=require("mysql2/promise")

const config={
    host:process.env.HOST,
    user:process.env.USERMYSQL,
    password:process.env.PASSWORDMYSQL,
    database:process.env.DB,
    port:process.env.PORTMYSQL
}

const createPool=async()=>{
    return mysql.createConnection(config)
}

module.exports={
    createPool
}