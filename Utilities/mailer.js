const nodemailer = require('nodemailer');
const otp = require('./otpGenerator')
const asyncErrorHandler = require('../ErrorHandlers/asyncErrorHandler')

const mailer = asyncErrorHandler( async (user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Welcome to Opex',
        text: `Hi ${user.firstName} ${user.lastName}, \n\nWelcome to Opex, your OTP : ${otp}\n\nThank you`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

});

module.exports = mailer;