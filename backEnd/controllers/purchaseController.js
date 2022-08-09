const Cart = require('../models/cart');
const Purchase = require('../models/purchase');
const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRET_JWT_KEY

const addToPurchase = (req,res) => {
    //Getting userID from auth header token
    const token = req.headers.authorization.split(" ")[1]
    const userDetails = jwt.verify(token, SECRETKEY)
    const userID = userDetails.userID

    const data = req.body

    let payload = {
        owner_id : userID,
        payment_id: data.payment_intent,
        console_items: data.console_items,
        game_items: data.game_items,
        date_bought: new Date()
    }

    Purchase.create(payload)
    .then(result => res.send({result}))
    .catch(error => res.send({error}))
}

const getPurchaseHistory = (req,res) => {
    //Getting userID from auth header token
    const token = req.headers.authorization.split(" ")[1]
    const userDetails = jwt.verify(token, SECRETKEY)
    const userID = userDetails.userID

    Purchase.find({owner_id:userID}, (error,result) => {
        if (error) res.send({error})
        else res.send({result})
    })
}

module.exports = {
    addToPurchase,
    getPurchaseHistory
}