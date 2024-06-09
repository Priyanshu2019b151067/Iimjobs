const transporter = require('./transporterConfigure');
const jwt = require('jsonwebtoken');
const recuriterProfile = require('../models/recuriter');
require('dotenv').config();

const secretKey = process.env.VERIFICATION_SECRET;

function generateVerificationToken(payload) {
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}



const sendEmail = async (to,name)=>{
  const userPayload = {email : to,name};
  const token = generateVerificationToken(userPayload);
  await sendVerificationEmail(to,name,token);
}


const sendVerificationEmail = async (to,name,token) => {

    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject : 'iimjobs.com Registration - Please activate your account',
      html : `<p>Dear ${name}</p>
      <br>
      <p>Thank you for registering on iimjobs.com . <a href='${verificationLink}'>Please click</a> here to activate the account.</p>
      <br>
      <p>This is to confirm your email address.</p>
      <br>
      <p>Do let me know if you face any problem in activating your account.</p>
      <br>
      <p>Best Regards</p>
      <br>
      <p>Team iimjobs.com</p>
      <br>
      <p>info@iimjobs.com</p>      
      `
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
};

const sendForgetPasswordEmail = async (to,name,token) => {

  const verificationLink = `http://localhost:5173/reset-password?email=${to}&token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject : 'iimjobs.com Reset Password',
    html : `<p>Dear ${name}</p>
    <br>
    <p>It seems you have forgotten your password.Please <a href='${verificationLink}'>click here</a> to reset your password.</p>
    <br>
    <p>Do let us know if you face any problem in resetting your password.</p>
    <br>
    
    <p>Best Regards</p>
    <br>
    <p>Team iimjobs.com</p>
    <br>
    <p>info@iimjobs.com</p>      
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendForget = async (to) =>{
  const  userPayload = {email : to};
 
  const token = generateVerificationToken(userPayload);
  const recruiter = await recuriterProfile.findOne({email : to});
  console.log(to,recruiter,token)
  await sendForgetPasswordEmail(to,recruiter.fullName,token);
}
   // const verificationToken = 'generated-verification-token'; // Generate a token in practice

        // const mailOptions = {
        //     from: 'priyanshukingh@gmail.com',
        //     to: email,
        //     subject: 'Email Verification',
        //     html: `<h1>Hello </h1><p>Please verify your email by clicking the following link: <a href="http://localhost:3000/verify-email?token=${verificationToken}">Verify Email</a></p>`
        // };
        //console.log(process.env.EMAIL_PASS);
        
        //await sendEmail(email,'Email Verification',`<h1>Hello </h1><p>Please verify your email by clicking the following link: <a href="http://localhost:3000/verify-email?token">Verify Email</a></p>`);
         
    // try {
    //     const info = await transporter.sendMail(mailOptions);
    //     console.log('Email sent:', info.response);
    //   } catch (error) {
    //     console.error('Error sending email:', error);
    //   }
module.exports = 
{
  sendVerificationEmail,verifyToken,sendEmail,sendForget
}