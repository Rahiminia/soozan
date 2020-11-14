const bcrypt = require('bcrypt')

const db = require('../helpers/db')

const TABLE="users"
const INSERT_COLS="(username,password,email,code)"

function generateCode(){
  let code=""
  for(let i=0;i<8;i++){
    code+=parseInt(Math.random()*10)
  }
  return code
}

class UserModel{
  constructor(username, password, email){
    this.username=username
    this.password=password
    this.email=email
    this.code=username.slice(0,2)+generateCode()
  }

  save(){
    return new Promise((resolve, reject)=>{
      bcrypt.hash(this.password, 12,(err, hash)=>{
        if(err) reject(err)
        db.query(`insert into ${TABLE} ${INSERT_COLS} values (?,?,?,?)`,
        [this.username,hash,this.email,this.code], (err,res)=>{
          if(err)
            reject(err)
          resolve(res)
        })
      })
    });
  }

  static checkAuth(username, password){
    return new Promise((resolve, reject)=>{
      db.query(`select password from ${TABLE} where username = '${username}'`,
      (err, pass)=>{
        if(err) reject(err)
        if(pass.length==0) resolve(false)
        else{
          bcrypt.compare(password, pass[0].password,(err, res)=>{
            if(res) resolve(true)
            else resolve(false)
          })
        }
      })
    })

  }
}

module.exports=UserModel
