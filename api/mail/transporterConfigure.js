const  nodemailer  = require('nodemailer');
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth  : { 
        user : 'priyanshukingh@gmail.com',
        pass : 'etib gvro prqq bxip'
    },
    pool : true,
    rateLimit: true, // Enable rate limit to control the sending speed
    maxConnections: 5, // Maximum number of connections in the pool
    maxMessages: 100 
})

module.exports = transporter;