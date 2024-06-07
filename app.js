// Imported modules
const dotenv = require('dotenv').config({path: './config.env'})
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const route = require('./Routes/userRoute')
const errorHandler = require('./ErrorHandlers/errorHandler')
const path = require('path');



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
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'Public')));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')
app.use('/', route)
app.use(errorHandler)


// App export
module.exports = app;

