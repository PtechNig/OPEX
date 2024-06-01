const UserModel = require('../Models/userModel')
const CustomError = require('../ErrorHandlers/globalErrorHandler')
const asyncErrorHandler = require('../ErrorHandlers/asyncErrorHandler')
const mailer = require('../Utilities/mailer')

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
        
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            phoneNo,
            password,
            confirmPassword
        })

       await mailer(newUser)

        res.status(201).json({
            status : 'success',
            message: 'User created successfully and an Email has been sent to you',
            data: newUser
        })
    
})

const loginUser = asyncErrorHandler (async(req, res, next) => {
    const {email, password} = req.body
    // Check for email and password
    if(!email || !password){
        const error = new CustomError('Please provide email and password', 400)
        return next(error)
    }

    // Check whether the user exist and has provided correct password
    const user = await UserModel.findOne({email}).select('+password')

    const isMatch = await user.comparePassword(password, user.password)

    if(!user || !isMatch ){
        const error = new CustomError('Invalid email or password', 401)
        return next(error)
    }

    res.status(200).json({
        status :'success',
        message: 'User logged in successfully',
        user
    })
})

module.exports = {
    getUsers,
    createUser, 
    loginUser
}