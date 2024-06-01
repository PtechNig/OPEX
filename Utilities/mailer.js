const nodemailer = require('nodemailer');

const mailer = async (user) => {
    try {
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
            text: `Hi ${user.firstName} ${user.lastName}, \n\n Welcome to Opex`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error('Error sending email: ', err);
    }
};

module.exports = mailer;
