// Imported modules
const dotenv = require('dotenv').config({path: './config.env'})
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const route = require('./Routes/userRoute')
const errorHandler = require('./ErrorHandlers/errorHandler')


// DB connection
mongoose.connect(process.env.CONNEC_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("DB successfully connected")
}).catch((err)=> {
    console.log(err)
    console.log("DB NOT connected")
})


// Middlewares
app.use(express.json());
app.use('/api/opex/v1/users', route)
app.use(errorHandler)


// App export
module.exports = app;

