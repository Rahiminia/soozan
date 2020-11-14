const db = require('../helpers/db')

const TABLE="card"
const INSERT_COLS="(title,comment,due_date,column_id)"
const GET_CARDS_QUERY=`select
      card.id, card.title, card.comment, card.due_date from
      card, card_user where
      card.column_id=? and
      card_user.card_id=card.id and
      card_user.user_id=?;`

class CardModel{
  constructor(title, comment, due_date, column_id){
    this.title=title
    this.comment=comment
    this.column_id=column_id
    this.due_date=due_date
  }

  save(){
    return new Promise((resolve, reject)=>{
      db.query(`insert into ${TABLE} ${INSERT_COLS} values (?,?,?,?)`,
      [this.title,
      this.comment,
      this.due_date,
      this.column_id], (err,res)=>{
        if(err)
          reject(err)
        resolve(res)
      })
    });
  }

  static getCards(colId, userId){
    return new Promise((resolve, reject)=>{
      db.query(GET_CARDS_QUERY,[colId, userId], (err,res)=>{
        if(err)
          reject(err)
        resolve(res)
      })
    })
  }
}

module.exports=CardModel
