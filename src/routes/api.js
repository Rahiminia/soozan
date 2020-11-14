const express = require('express')
const router = express.Router()

const getReqRouter = require('./api-get')
const postReqRouter = require('./api-post')
const ProjectController = require('../controllers/project')
const BoardController = require('../controllers/board')
const ColumnController = require('../controllers/column')
const CardController = require('../controllers/card')

router.use('/get',getReqRouter)
router.use('/add', postReqRouter)

router.get('/', (req,res)=>res.send('Soozan API'))

module.exports=router
