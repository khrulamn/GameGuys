const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/router')
// const {expressjwt} = require('express-jwt')
const cors = require('cors')
require('dotenv').config()


//Environment variables
const PORT = 4444
// const jwtSecret = process.env.JWT_SECRET_KEY
const mongoDBURL = process.env.MONGO_URL || 'mongodb+srv://khrulamn:7ZnTaMuF8pI1taRJ@pokemon-website.r88ghcn.mongodb.net/GameGuys?retryWrites=true&w=majority'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000'
}))
// app.use(
//     expressjwt({
//         secret:jwtSecret,
//         algorithms: ["HS256"],
//     }).unless({ path: ["/login", "/signup"] })
// );

mongoose.connect(mongoDBURL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database")
})
.catch ( (err) => {
    console.error("Error connecting to database", err)
})

app.use("/", router)

app.listen(PORT, ()=>{
    console.log("Listening to Port " + PORT);
})