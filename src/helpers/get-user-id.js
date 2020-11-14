const db = require('../helpers/db')

module.exports = function getUserId(username){
  return new Promise((resolve,reject)=>{
    db.query('select id from users where username = ?',[username],(err, res)=>{
      if(err)
        reject(err)
      resolve(res[0].id)
    })
  })
}
