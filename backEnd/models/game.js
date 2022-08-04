const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
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
    }
})

const Game = mongoose.model('game', gameSchema)
module.exports = Game