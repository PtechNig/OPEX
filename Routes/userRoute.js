const express = require('express')
const app = express();
const controller = require('../Controllers/userController');
const CustomError = require('../ErrorHandlers/globalErrorHandler');

const route = express.Router()

route.get('/signup', controller.getUsers)

route.post('/signup', controller.createUser)
route.all('*', (req, res, next) => {
    const error = new CustomError('Page not found', 404)
    next(error)
})





module.exports = route