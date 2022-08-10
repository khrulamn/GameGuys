const Console = require("../models/console")
const Game = require("../models/game")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY

function getAllConsoleItems (req,res) {
    Console.find({}, (err,result) => {
        if (err) res.send({err})
        else res.send({result})
    })
}

function getAllGameItems(req,res){
    Game.find({}, (err,result) => {
        if (err) res.send({err})
        else res.send({result})
    })
}

function getOneGame(req,res){   
    let gameID = req.query.gameID

    Game.find({_id:gameID}, (err,result) => {
        if (err) res.send({err})
        else res.send({result})
    })
}

function getOneConsole(req,res){   
    let consoleID = req.query.consoleID

    Console.find({_id:consoleID}, (err,result) => {
        if (err) res.send({err})
        else res.send({result})
    })
}

function reviewGame(req,res){
    //Getting userID from auth header token
    const token = req.headers.authorization.split(" ")[1]
    const userDetails = jwt.verify(token, SECRET_JWT_KEY)
    userID = userDetails.userID

    let input = req.body
    let payload = {
        user_id : userID,
        created_at : new Date(),
        review_title: input.review_title,
        review_text: input.review_text
    }

    Game.updateOne({_id:mongoose.Types.ObjectId(input.item_id)}, { $push: {reviews : payload} }, (err,result) => {
        if (err) res.send({error:err})
        else res.send({result})
    })

}

function reviewConsole(req,res){
    //Getting userID from auth header token
    const token = req.headers.authorization.split(" ")[1]
    const userDetails = jwt.verify(token, SECRET_JWT_KEY)
    userID = userDetails.userID

    let input = req.body
    let payload = {
        user_id : userID,
        created_at : new Date(),
        review_title: input.review_title,
        review_text: input.review_text
    }

    Console.updateOne({_id:mongoose.Types.ObjectId(input.item_id)}, { $push: {reviews : payload} }, (err,result) => {
        if (err) res.send({error:err})
        else res.send({result})
    })
}

function minusGameQty (req,res) {
    let data = req.body

    let query = {
        _id : mongoose.Types.ObjectId(data.item_id)
    }

    let decrement = {
        $inc : {
            quantity : -(data.qtyToMinus)
        }
    }

    Game.updateOne(query, decrement, (err,result) => {
        if (err) res.send({error : err})
        else res.send({result})
    })
}

function minusConsoleQty (req,res) {
    let data = req.body

    let query = {
        _id : mongoose.Types.ObjectId(data.item_id)
    }

    let decrement = {
        $inc : {
            quantity : -(data.qtyToMinus)
        }
    }

    Console.updateOne(query, decrement, (err,result) => {
        if (err) res.send({error : err})
        else res.send({result})
    })
}

module.exports = {
    getAllConsoleItems,
    getAllGameItems,
    getOneConsole,
    getOneGame,
    reviewGame,
    reviewConsole,
    minusGameQty,
    minusConsoleQty
}