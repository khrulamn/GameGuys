const User = require('../models/user')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRETKEY = process.env.SECRET_JWT_KEY

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    let encryptedPW = await bcrypt.hash(password, salt);
    return encryptedPW
}

async function signUpUser(req, res) {
    try {
        let allUsers = await User.find({})
        const indexEmail = allUsers.findIndex((user) => user.email === req.body.email)
        const indexUsername = allUsers.findIndex((user) => user.username === req.body.username)

        if (indexEmail === -1) {
            if (indexUsername === -1) {

                let encrypt = await encryptPassword(req.body.password)

                const signupCredentials = {
                    email: req.body.email,
                    username: req.body.username,
                    password: encrypt,
                    avatar: `https://avatars.dicebear.com/api/human/${req.body.username}.svg`,
                    created_at: new Date()
                }

                User.create(signupCredentials, (err, result) => {
                    Cart.create({ owner_id: result._id })
                    res.send({ message: `Completed signup for ${req.body.username}!` })
                })
            }
            else {
                res.status(401).send({ error: "Username is already taken!" })
            }
        }
        else {
            res.status(401).send({ error: "Email is already taken!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }

}

const logInUser = async (req, res) => {
    usernameAttempt = req.body.username
    pwAttempt = req.body.password
    try {
        let user = await User.findOne({ username: usernameAttempt })
        console.log(user.username, "logged in")
        if (user) {
            const validPassword = await bcrypt.compare(pwAttempt, user.password)
            if (validPassword) {
                const userCredentials = {
                    userID: user._id,
                    username: user.username,
                }
                let token = jwt.sign(userCredentials, SECRETKEY)
                res.status(200).send({ message: "Successfully logged in!", token, userID: user._id, username: user.username, avatar: user.avatar })
            }
            else {
                res.status(400).send({ error: "Invalid password!" })
            }
        }
        else {
            res.status(401).send({ error: "User does not exist" })
        }
    }
    catch (err) {
        res.send({ err })
    }
}

const getUserAddress = async (req, res) => {
    //Getting userID from auth header token
    const token = req.headers.authorization.split(" ")[1]
    const userDetails = jwt.verify(token, SECRETKEY)
    const userID = userDetails.userID

    try {
        let user = await User.findOne({ _id: mongoose.Types.ObjectId(userID) })
        console.log('address',user.address)
        if (user.address === {}) {
            res.send({ noAddress: "No address found for this user" })
        }
        else {
            res.send({ address: user.address })
        }
    }
    catch (error) {
        console.error(error)
        res.send({ error })
    }
}

const addUserAddress = (req, res) => {
    //Getting userID from auth header token
    const token = req.headers.authorization.split(" ")[1]
    const userDetails = jwt.verify(token, SECRETKEY)
    const userID = userDetails.userID
    const addressInput = req.body

    console.log("hit", userID)
    // try {
        User.updateOne(
            { _id: mongoose.Types.ObjectId(userID) },
            {
                $set:
                {
                    address : {
                        address : addressInput.address,
                        state : addressInput.state,
                        postcode : addressInput.postcode
                    }
                }
            },
            {
                upsert: true
            }
        )
        .then ((result) => {
            console.log(result)
            res.send({success : result})
        })
        .catch((error) => {
            res.send({error})
        })
    // }
    // catch(error){
    //     res.send({error2 : error})
    // }
}

module.exports = {
    signUpUser,
    logInUser,
    getUserAddress,
    addUserAddress
}