const  nodemailer  = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
    service: 'gmail',
    auth  : { 
        user : process.env.EMAIL_USER || 'priyanshukingh@gmail.com',
        pass : process.env.EMAIL_PASS ||'etib gvro prqq bxip'
    },
    pool : true,
    rateLimit: true, 
    maxConnections: 5, 
    maxMessages: 100,
});


module.exports = transporter;