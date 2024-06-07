const  nodemailer  = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport(
    {
    service: 'gmail',
    auth  : { 
        user : process.env.EMAIL_USER ,
        pass : process.env.EMAIL_PASS 
    },
    pool : true,
    rateLimit: true, 
    maxConnections: 5, 
    maxMessages: 100,
});


module.exports = transporter;