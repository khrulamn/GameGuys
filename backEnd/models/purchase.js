const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    owner_id: {
        type: String,
    },
    payment_id: {
        type: String
    },
    console_items : {
        type: Array,
    },
    game_items : {
        type: Array
    },
    date_bought : {
        type: Date
    }
})

const Purchase = mongoose.model('purchase', purchaseSchema)
module.exports = Purchase

// cart_id : {
//     type:String
// }
// console_items: {
//     type: Array,
//     default: []
// },
// game_items : {
//     type: Array,
//     default: []
// },
// totalPrice: {
//     type: Number
// },
// date_purchase: {
//     type: Date
// }