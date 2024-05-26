const UserModel = require('../Models/userModel')
const CustomError = require('../ErrorHandlers/globalErrorHandler')
const asyncErrorHandler = require('../ErrorHandlers/asyncErrorHandler')

const getUsers = asyncErrorHandler(async(req, res, next) => {    
        const users = await UserModel.find({})

        res.status(200).json({
            status : 'success',
            message: 'Users fetched successfully',
            count : users.length,
            data: users
        })
})


const createUser = asyncErrorHandler( async (req, res, next) => { 
        const {firstName, lastName, email, phoneNo, password, confirmPassword} = req.body;
        
        const user = UserModel({
            firstName,
            lastName,
            email,
            phoneNo,
            password,
            confirmPassword
        })

        const newUser = await UserModel.create(user)

        res.status(201).json({
            status : 'success',
            message: 'User created successfully',
            data: newUser
        })
    
})

module.exports = {
    getUsers,
    createUser
}