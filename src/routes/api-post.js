const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/project')
const BoardController = require('../controllers/board')
const ColumnController = require('../controllers/column')
const CardController = require('../controllers/card')
const checkPostData = require('../helpers/check-post-validity')
const getUserId = require('../helpers/get-user-id')

const postDataList = {
  project:["name"],
  board:["title", "project_id"],
  column:["title", "board_id"],
  card:["title", "comment", "due_date", "column_id"],
}

router.post('/project',(req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const data = req.body
  if (!checkPostData(data, postDataList.project))
    return res.json({result:"Error", msg:"Wrong format"})
  ProjectController.addProject(data)
  .then((controllerRes)=>{
    console.log("Project created")
    res.json({result:"Successful", msg:"Project created"})
  })
  .catch((err)=>{
    console.log(err)
    res.json({result:"Error", msg:"Wrong format"})
  })
})

router.post('/board',(req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const data = req.body
  if (!checkPostData(data, postDataList.board))
    return res.json({result:"Error", msg:"Wrong format"})
  BoardController.addBoard(data)
  .then((controllerRes)=>{
    console.log("Board created")
    res.json({result:"Successful", msg:"Board created"})
  })
  .catch((err)=>{
    console.log(err)
    res.json({result:"Error", msg:"Wrong format"})
  })
})

router.post('/column',(req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const data = req.body
  if (!checkPostData(data, postDataList.column))
    return res.json({result:"Error", msg:"Wrong format"})
  ColumnController.addColumn(data)
  .then((controllerRes)=>{
    console.log("Column added")
    res.json({result:"Successful", msg:"Column added"})
  })
  .catch((err)=>{
    console.log(err)
    res.json({result:"Error", msg:"Wrong format"})
  })
})

router.post('/card',(req,res)=>{
  if (!req.user)
    return res.json({result:"Error", msg:"Token is invalid."})
  const data = req.body
  if (!checkPostData(data, postDataList.card))
    return res.json({result:"Error", msg:"Wrong format"})
  CardController.addCard(data)
  .then((controllerRes)=>{
    console.log("Card added")
    res.json({result:"Successful", msg:"Card added"})
  })
  .catch((err)=>{
    res.json({result:"Error", msg:"Wrong format"})
  })
})

module.exports = router;
