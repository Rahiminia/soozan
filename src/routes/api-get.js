const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/project')
const BoardController = require('../controllers/board')
const ColumnController = require('../controllers/column')
const CardController = require('../controllers/card')

router.get('/projects', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  try{

    const controllerRes = await ProjectController.getProjects(req.user.userid)
    res.json({result:"Success", msg:controllerRes})
  }catch (err){
    console.log(err)
  }
})

router.get('/boards/:pid', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const projectId = req.params.pid
  BoardController.getBoards(projectId, req.user.userid)
  .then(controllerRes=>{
    res.json({result:"Success", msg:controllerRes})
  })
  .catch(err=>console.log(err))
})

router.get('/columns/:bid', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const boardId = req.params.bid
  ColumnController.getColumns(boardId, req.user.userid)
  .then(controllerRes=>{
    res.json({result:"Success", msg:controllerRes})
  })
  .catch(err=>console.log(err))
})

router.get('/cards/:cid', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const colId = req.params.cid
  CardController.getCards(colId, req.user.userid)
  .then(controllerRes=>{
    res.json({result:"Success", msg:controllerRes})
  })
  .catch(err=>console.log(err))
})

module.exports=router
