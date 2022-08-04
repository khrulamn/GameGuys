const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    owner_id: {
        type: String,
    },
    console_items: {
        type: Array,
        default: []
    },
    game_items : {
        type: Array,
        default: []
    }
})

const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart