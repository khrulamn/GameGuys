const express = require('express')
const router = express.Router()
const axios = require('axios')
const Console = require('../models/console')
const Game = require('../models/game')
const userController = require('../controllers/userController')
const cartController = require('../controllers/cartController')

//----------------------------------- Routes -------------------------------------
//Redirect to login if not loggedIn
router.get('/', (req, res) => {
    res.send('yes')
})

// router.post('/add-consoles', (req,res) => {
//     let payload = req.body.data;

//     Console.insertMany(payload, (err,result) => {
//         if(err) throw err
//         else res.send(result)
//     })
// })

// router.post('/add-games', (req,res) => {
//     let payload = req.body.data;

//     Game.insertMany(payload, (err,result) => {
//         if(err) throw err
//         else res.send(result)
//     })
// })

router.get('/get-consoles', (req,res)=> {
    Console.find({}, (err,result) => {
        if (err) res.send({err})
        else res.send({result})
    })
})

router.get('/get-games', (req,res)=> {
    Game.find({}, (err,result) => {
        if (err) res.send({err})
        else res.send({result})
    })
})

router.post('/signup', (req,res) => {
    userController.signUpUser(req,res)
})

router.post('/login', (req,res) => {
    userController.logInUser(req,res)
})

router.post('/add-to-cart', (req,res) => {
    console.log("adding to cart....")
    cartController.addToCart(req,res)
})

router.get('/get-cart', (req,res) => {
    cartController.getUserCart(req,res)
})

module.exports = router