const express = require('express')
const app = express();
const controller = require('../Controllers/userController');
const CustomError = require('../ErrorHandlers/globalErrorHandler');

const route = express.Router()

route.get('/' , (req, res) => {
    res.render('index')
})

route.get('/signup' , (req, res) => {
    res.render('signup')
})


route.get('/login' , (req, res) => {
    res.render('login')
})

route.get('/successful' , (req, res) => {
    res.render('successful')
})


route.get('/signup', controller.getUsers)
route.post('/signup', controller.createUser)
route.post('/login', controller.loginUser )
route.all('*', (req, res, next) => {
    const error = new CustomError('Page not found', 404)
    next(error)
})

module.exports = route