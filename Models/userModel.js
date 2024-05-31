const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : [true, 'Please Enter your First Name']
    },

    lastName: {
        type : String,
        required : [true, 'Please Enter your Last Name']
    },

    email: {
        type : String,
        required : [true, 'Please Enter your Email'],
        unique : [true, 'The user exists'],
        lowercase : true,
        validate : [validator.isEmail, "Please Enter a valid Email"]
    },

    phoneNo: {
        type : String,
        required : [true, 'Phone Number is required']
    },
    password: {
        type : String,
        required : [true, 'Please Enter your password'],
        select : false
    },
    confirmPassword : {
        type : String,
        required : [true, 'Please Confirm your password'],
        validate : {
            validator : function(value) {
                return value == this.password
            },
            message : "Passwords do not match"
        }
    }

})

//Password encrypting before saving in the database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next;

    this.password = await bcrypt.hash(this.password, 12);
    
    this.confirmPassword = undefined; 

    next();
})

//Comparing password provided for logging with password in the database
userSchema.methods.comparePassword = async function(userPassword, dbPassword) {
    return await bcrypt.compare(userPassword, dbPassword)
}


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;