const CardModel = require('../models/card')

class CardController{
  static addCard(data){
    const newCard = new CardModel(
      data.title,
      data.comment,
      data.due_date,
      data.column_id
    )
    return newCard.save()
  }

  static getCards(colId, userId){
    return CardModel.getCards(colId, userId)
  }
}

module.exports=CardController
