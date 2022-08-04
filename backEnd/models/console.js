const mongoose = require ('mongoose')

const consoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
    },
    trailer: {
        type: String
    }
})

const Console = mongoose.model('console', consoleSchema)
module.exports = Console