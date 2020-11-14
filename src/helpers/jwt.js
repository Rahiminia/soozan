const jwt = require('jsonwebtoken')
const {TOKEN_SECRET} = require('../config.json')

class JWTHelper{
  static generateToken(payload){
    const token = jwt.sign(payload, TOKEN_SECRET)
    return token
  }

  static verifyToken(token){
    return jwt.verify(token, TOKEN_SECRET, function(err, data) {
      if(err){
        console.log("JWT Error: ",err)
        return null
      }
      return data
    })
  }
}

module.exports=JWTHelper
