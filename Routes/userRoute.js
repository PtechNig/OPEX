const express = require('express')
const app = express();
const controller = require('../Controllers/userController');
const CustomError = require('../ErrorHandlers/globalErrorHandler');

const route = express.Router()

route.get('/' , (req, res) => {
    res.status(200).json({
        status :'success',
        message: 'Welcome to Opex'
    })
})
route.get('/signup', controller.getUsers)
route.post('/api/opex/v1/users/signup', controller.createUser)
route.post('/api/opex/v1/users/login', controller.loginUser )
route.all('*', (req, res, next) => {
    const error = new CustomError('Page not found', 404)
    next(error)
})

module.exports = route