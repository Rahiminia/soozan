const UserModel = require('../models/user')
const jwt = require('../helpers/jwt')
const getUserId = require('../helpers/get-user-id')
class UserController{
  static addUser(user){
    const newUser = new UserModel(user.username, user.password, user.email)
    return newUser.save()
  }

  static login(username, password){
    return new Promise((resolve, reject)=>{
      UserModel.checkAuth(username,password)
      .then(res=>{
        if(res===false) resolve(null)
        else{
          getUserId(username).then(userId=>{
            const token = jwt.generateToken({username:username, userid:userId})
            resolve(token)
          })
        }
      })
      .catch(err=>reject(err))
    })
  }
}

module.exports=UserController
