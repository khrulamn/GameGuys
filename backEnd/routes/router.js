const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const cartController = require('../controllers/cartController')
const paymentController = require('../controllers/paymentController')
const purchaseController = require('../controllers/purchaseController')
const itemController = require('../controllers/itemController')

//----------------------------------- Routes -------------------------------------

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

// ITEM RELATED
router.get('/get-consoles', (req,res)=> {
    itemController.getAllConsoleItems(req,res)
})

router.get('/get-games', (req,res)=> {
    itemController.getAllGameItems(req,res)
})

router.get('/get-one-game', (req,res) => {
    itemController.getOneGame(req,res)
})

router.get('/get-one-console', (req,res) => {
    itemController.getOneConsole(req,res)
})

router.post('/review-console', (req,res) => {
    itemController.reviewConsole(req,res)
})

router.post('/review-game', (req,res) => {
    itemController.reviewGame(req,res)
})

router.post('/minus-game-stock', (req,res) => {
    itemController.minusGameQty(req,res)
})

router.post('/minus-console-stock', (req,res) => {
    itemController.minusConsoleQty(req,res)
})

// USER RELATED
router.post('/signup', (req,res) => {
    userController.signUpUser(req,res)
})

router.post('/login', (req,res) => {
    userController.logInUser(req,res)
})

router.get('/user-address', (req,res) => {
    userController.getUserAddress(req,res)
})

router.post('/add-address', (req,res) => {
    userController.addUserAddress(req,res)
})

router.get('/get-username', (req,res) => [
    userController.getUserName(req,res)
])

// CART RELATED
router.post('/add-to-cart', (req,res) => {
    console.log("adding to cart....")
    cartController.addToCart(req,res)
})

router.get('/get-cart', (req,res) => {
    cartController.getUserCart(req,res)
})

router.post('/remove-from-cart', (req,res) => {
    cartController.removeFromCart(req,res)
})

// STRIPE (PAYMENT GATEWAY)
router.post("/create-payment-intent", async (req, res) => {
    paymentController.getClientSecret(req,res)
})

router.post("/webhook", (req,res) => {
    paymentController.paymentProcessing(req,res)
})

// PURCHASES
router.post('/purchase-success', (req,res) => {
    purchaseController.addToPurchase(req,res)
})

router.post('/delete-cart', (req,res) => {
    cartController.deleteAllCartItems(req,res)
})

router.get('/user-purchases', (req,res) => {
    purchaseController.getPurchaseHistory(req,res)
})

module.exports = router