const transporter = require('./transporterConfigure');

const sendVerificationEmail = async (to,name) => {
    const verificationToken = 'generated-verification-token';
    const mailOptions = {
      from: process.env.EMAIL_USER || 'priyanshukingh@gmail.com',
      to,
      subject : 'iimjobs.com Registration - Please activate your account',
      html : `<p>Dear ${name}</p>
      <br>
      <p>Thank you for registering on iimjobs.com . <a href=''>Please click</a> here to activate the account.</p>
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
  sendVerificationEmail
}