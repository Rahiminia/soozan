const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/project')
const BoardController = require('../controllers/board')
const ColumnController = require('../controllers/column')
const CardController = require('../controllers/card')
const checkPostData = require('../helpers/check-post-validity')
const getUserId = require('../helpers/get-user-id')

router.get('/projects', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  try{
    const userId = await getUserId(req.user.user)
    const controllerRes = await ProjectController.getProjects(userId)
    res.json({result:"Success", msg:controllerRes})
  }catch (err){
    console.log(err)
  }
})

router.get('/boards/:pid', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const userId = await getUserId(req.user.user)
  const projectId = req.params.pid
  BoardController.getBoards(projectId, userId)
  .then(controllerRes=>{
    res.json({result:"Success", msg:controllerRes})
  })
  .catch(err=>console.log(err))
})

router.get('/columns/:bid', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const userId = await getUserId(req.user.user)
  const boardId = req.params.bid
  ColumnController.getColumns(boardId, userId)
  .then(controllerRes=>{
    res.json({result:"Success", msg:controllerRes})
  })
  .catch(err=>console.log(err))
})

router.get('/cards/:cid', async (req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const userId = await getUserId(req.user.user)
  const colId = req.params.cid
  CardController.getCards(colId, userId)
  .then(controllerRes=>{
    res.json({result:"Success", msg:controllerRes})
  })
  .catch(err=>console.log(err))
})

module.exports=router
