const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: [0, 'No stocks left!'],
        required: true
    },
    image: {
        type: String,
    },
    developer: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    trailer: {
        type: String
    },
    reviews: [{
        user_id : String,
        created_at : Date,
        review_title : String,
        review_text : String,
    }]
})

const Game = mongoose.model('game', gameSchema)
module.exports = Game