const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.post('/login',(req,res)=>{
  if(req.body.username && req.body.password){
    UserController.login(req.body.username,req.body.password)
    .then(token=>{
      if(!token)
        res.json({result:"Error", msg:"Wrong Credentials"})
      else
        res.json({result:"Successful", token:token})
    })
  }
  else{
    res.json({result:"Error", msg:"Username and Password required."})
  }
})

router.post('/signup', (req,res)=>{
  const data = req.body
  UserController.addUser(data)
  .then((controllerRes)=>{
    console.log("User Added")
    res.json({result:"Successful", msg:"User added"})
  })
  .catch((err)=>{
    console.log(err)
    res.json({result:"Error", msg:"Wrong format"})
  })
})

module.exports=router;
