const jwt = require('jsonwebtoken')
const Cart = require('../models/cart');
const axios = require('axios');
const Console = require('../models/console');
const { default: mongoose } = require('mongoose');
const Game = require('../models/game');

const SECRET_JWT_KEY = process.env.JWT_SECRET_KEY || "WowWaNotherc0olS3ccreT"

async function addToCart(req, res) {

    try {
        //Getting userID from auth header token
        const token = req.headers.authorization.split(" ")[1]
        const userDetails = jwt.verify(token, SECRET_JWT_KEY)
        userID = userDetails.userID
        //Gets all of the cart database collection of user
        const result = await Cart.find({ owner_id: userID })
        const allItems = result[0]

        if (!req.body.console) {

            let gameID = req.body.game.gameID
            let addQty = req.body.game.quantity
            let itemIndex = allItems.game_items.findIndex((item) => item.item_id === gameID)
            console.log('index', itemIndex)
            //If new item is added
            if (itemIndex === -1){
                const payload = {
                    item_id: gameID,
                    quantity: addQty
                }
    
                Cart.findOneAndUpdate({ owner_id: userID }, { $push: { game_items: payload } }, (err, result) => {
                    if (err) res.status(400).send({ err })
                    else res.status(200).send({ result })
                })
            } else { //if item already in cart, add new quantity
                let newQty = allItems.game_items[itemIndex].quantity + addQty
                console.log('newQty', newQty)
                Cart.findOneAndUpdate(
                    {
                        owner_id: userID, 
                        game_items : {$elemMatch:{ item_id : gameID }}
                    }, 
                    {
                        '$set': {'game_items.$.quantity':newQty}
                    })
                    .then((result) => {
                        res.status(200).send({ result })
                    })
                    .catch((err) => {
                        res.status(400).send({err})
                    })
            }
        }
        else if (!req.body.game) {
            let consoleID = req.body.console.consoleID
            let addQty = req.body.console.quantity
            let itemIndex = allItems.console_items.findIndex((item) => item.item_id === consoleID)

            if (itemIndex === -1){
                const payload = {
                    item_id: consoleID,
                    quantity:addQty
                }
    
                Cart.findOneAndUpdate({ owner_id: userID }, { $push: { console_items: payload } }, (err, result) => {
                    if (err) res.status(400).send({ err })
                    else res.status(200).send({ result })
                })
            }
            else {
                let newQty = allItems.console_items[itemIndex].quantity + addQty
                Cart.findOneAndUpdate(
                    {
                        owner_id: userID,
                        console_items : {$elemMatch:{ item_id : consoleID }}
                    }, 
                    {
                        '$set': {'console_items.$.quantity':newQty}
                    })
                    .then((result) => {
                        res.status(200).send({ result })
                    })
                    .catch((err) => {
                        res.status(400).send({err})
                    })
            }
        }
    }
    catch (error) {
        console.log("got error meh")
        console.error(error)
    }
}

async function getUserCart(req, res) {
    try {
        //Getting userID from auth header token
        const token = req.headers.authorization.split(" ")[1]
        const userDetails = jwt.verify(token, SECRET_JWT_KEY)
        userID = userDetails.userID
        //Initialising cart item arrays
        let consoleArray = []
        let gameArray = []
        //Gets all of the cart database collection of user
        const result = await Cart.find({ owner_id: userID })
        const allItems = result[0]
        //Retrieving item information and pushing into item arrays
        for (let item of allItems.console_items) {
            let add = await Console.findById(item.item_id)
            add.quantity = item.quantity    //changing stock quantity to quantity in cart 
            consoleArray.push(add)
            // await Console.findOneAndUpdate({_id:item.item_id}, {$inc : {'quantity': -(item.quantity)}})
        }
        for (let item of allItems.game_items) {
            let add = await Game.findById(item.item_id)
            add.quantity = item.quantity    //changing stock quantity to quantity in cart 
            gameArray.push(add)
        }
        res.send({ consoles: consoleArray, games: gameArray })
    }
    catch (error) {
        console.error(error)
        res.send({ error: "Something went wrong" })
    }
}

function removeFromCart (req,res) {
    let data = req.body
}

module.exports = {
    addToCart,
    getUserCart,
    removeFromCart
}