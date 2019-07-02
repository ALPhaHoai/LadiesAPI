require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const userController = require('./controllers/users')

const app = express()

let mongodbUri = process.env.MONGODB_URI
if (mongodbUri === undefined) {
    console.log("Config mongodb url before runing this app")
    process.exit(1)
}
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(mongodbUri, {useNewUrlParser: true}, err => {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', mongodbUri)
    }
})


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// routers
app.post("/login", userController.user_login_post)
app.post("/register", userController.user_register_post)


module.exports = app
