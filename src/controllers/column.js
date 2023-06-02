const ColumnModel = require('../models/column')

class ColumnController{
  static addColumn(data){
    const newColumn = new ColumnModel(data.title,data.board_id)
    return newColumn.save(data.userId)
  }

  static getColumns(boardId, userId){
    return ColumnModel.getColumns(boardId, userId)
  }
}

module.exports=ColumnController
