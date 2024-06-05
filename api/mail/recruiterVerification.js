const transporter = require('./transporterConfigure');
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
};
module.exports = 
{sendEmail
}