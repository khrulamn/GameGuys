const jwt = require('jsonwebtoken')
const Cart = require('../models/cart');
const axios= require('axios');
const Console = require('../models/console');
const { default: mongoose } = require('mongoose');
const Game = require('../models/game');

const SECRET_JWT_KEY =process.env.JWT_SECRET_KEY || "WowWaNotherc0olS3ccreT"

function addToCart(req,res){

    try {
        const token = req.headers.authorization.split(" ")[1]
        const userDetails = jwt.verify(token,SECRET_JWT_KEY)
        userID = userDetails.userID
    
        if(!req.body.console){
            const payload = {
                item_id : req.body.game.gameID,
                quantity : req.body.game.quantity
            }
    
            Cart.findOneAndUpdate({owner_id:userID}, {$push:{game_items : payload}}, (err,result) => {
                if(err) res.status(400).send({err})
                else res.status(200).send({result})
            })
    
        }
        else if(!req.body.game){
            const payload = {
                item_id : req.body.console.consoleID,
                quantity : req.body.console.quantity
            }
    
            Cart.findOneAndUpdate({owner_id:userID}, {$push:{console_items : payload}}, (err,result) => {
                if(err) res.status(400).send({err})
                else res.status(200).send({result})
            })
    
        }
    }
    catch(error) {
        console.log("got error meh")
        res.send({error})
    }
} 

async function getUserCart(req,res) {
    // try{
        const token = req.headers.authorization.split(" ")[1]
        const userDetails = jwt.verify(token,SECRET_JWT_KEY)
        userID = userDetails.userID
        let consoleArray = []
        let gameArray = []
        const result = await Cart.find({owner_id:userID})
        const allItems = result[0]
        for (let item of allItems.console_items){
            let add = await Console.findById(item.item_id)
            add.quantity = item.quantity
            consoleArray.push(add)
        }
        // allItems.console_items.map(async (item) => consoleArray.push(await Console.findById(item.item_id)) )
        for (let item of allItems.game_items){
            let add = await Game.findById(item.item_id)
            add.quantity = item.quantity
            gameArray.push(add)
        }
        // allItems.game_items.map(async (item) => gameArray.push(await Game.findById(item.item_id)) )
        res.send({consoles:consoleArray, games:gameArray})
    // }
    // catch(error){
    //     console.log("got error meh")
    //     res.send({error})
    // }
}

module.exports = {
    addToCart,
    getUserCart
}