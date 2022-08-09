const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [ true, 'Email address is required'],
        validate: [ isEmail, 'Email address is invalid'],
    },
    username : {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Username is required']
    },
    password : {
        type: String,
        required: [true, 'Username is required']
    },
    avatar : {
        type: String,
    },
    created_at: {
        type: Date,
    },
    address : {
        address: String,
        state : String,
        postcode: String
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User