const db = require('../helpers/db')

const TABLE="columns"
const INSERT_COLS="(title,board_id)"
const INTER_QUERY="insert into column_user(col_id, user_id) values (?, ?);"
const GET_COLUMNS_QUERY=`select columns.id,columns.title from
      columns, column_user where
      columns.board_id=? and
      column_user.col_id=columns.id and
      column_user.user_id=?;`

class ColumnsModel{
  constructor(title, board_id){
    console.log(board_id)
    this.title=title
    this.board_id=board_id
  }

  save(userId){
    return new Promise((resolve, reject)=>{
      db.query(`insert into ${TABLE} ${INSERT_COLS} values (?,?)`,
      [this.title,this.board_id], (err,res1)=>{
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

  static getColumns(boardId, userId){
    return new Promise((resolve, reject)=>{
      db.query(GET_COLUMNS_QUERY,[boardId, userId], (err,res)=>{
        if(err)
          reject(err)
        resolve(res)
      })
    })
  }
}

module.exports=ColumnsModel
