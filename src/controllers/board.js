const BoardModel = require('../models/board')

class BoardController{
  static addBoard(data){
    const newBoard = new BoardModel(data.title,data.project_id)
    return newBoard.save()
  }

  static getBoards(projectId, userId){
    return BoardModel.getBoards(projectId, userId)
  }
}

module.exports=BoardController
