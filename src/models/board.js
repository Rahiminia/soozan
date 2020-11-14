const db = require('../helpers/db')

const TABLE="board"
const INSERT_COLS="(title,project_id)"
const SELECT_COLS="id, title"
const GET_BOARDS_QUERY=`select board.id,board.title from
      board, board_user where
      board.project_id=? and
      board_user.board_id=board.id and
      board_user.user_id=?;`

class BoardModel{
  constructor(title, project_id){
    this.title=title
    this.project_id=project_id
  }

  save(){
    return new Promise((resolve, reject)=>{
      db.query(`insert into ${TABLE} ${INSERT_COLS} values (?,?)`,
      [this.title,this.project_id], (err,res)=>{
        if(err)
          reject(err)
        resolve(res)
      })
    });
  }

  static getBoards(projectId, userId){
    return new Promise((resolve, reject)=>{
      db.query(GET_BOARDS_QUERY,[projectId,userId],
      (err,res)=>{
        if(err)
          reject(err)
        resolve(res)
      })
    });
  }
}

module.exports=BoardModel
