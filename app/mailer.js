// Sending email with Nodemailer module 
// TO DO:

var nodemailer = require('nodemailer');

function sendEmail() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
        }
    });

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    }); 
}