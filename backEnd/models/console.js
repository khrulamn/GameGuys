const mongoose = require ('mongoose')

const consoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: [0, 'No stocks left!'],
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
    },
    reviews: [{
        user_id : String,
        created_at : Date,
        review_title : String,
        review_text : String
    }]
})

const Console = mongoose.model('console', consoleSchema)
module.exports = Console