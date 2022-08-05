const User = require('../models/user')
const bcrypt = require('bcrypt');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken')

const SECRETKEY = process.env.JWT_SECRET_KEY || "WowWaNotherc0olS3ccreT"

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
                    userID : user._id,
                    username : user.username,
                }
                let token = jwt.sign(userCredentials, SECRETKEY)
                res.status(200).send({ message: "Successfully logged in!", token, userID : user._id, username : user.username, avatar:user.avatar })
            }
            else {
                res.status(400).send({ error: "Invalid password!" })
            }
        }
        else {
            res.status(401).send({ error: "User does not exist" })
        }
    }
    catch (error) {
        res.error(error)
    }
}

module.exports = {
    signUpUser,
    logInUser
}