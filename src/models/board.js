const db = require('../helpers/db')

const TABLE="board"
const INSERT_COLS="(title,project_id)"
const INTER_QUERY="insert into board_user(board_id, user_id) values (?, ?);"
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

  save(userId){
    return new Promise((resolve, reject)=>{
      db.query(`insert into ${TABLE} ${INSERT_COLS} values (?,?)`,
      [this.title,this.project_id], (err,res1)=>{
        if(err)
          reject(err)
        db.query(INTER_QUERY, [res1.insertId, userId], (err,res2)=>{
          if(err)
            reject(err)
          resolve(res2)
        })
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
