const { verifyToken } = require("../mail/recruiterVerification");
const recuriterProfile = require("../models/recuriter");
const {sendEmail} = require('../mail/recruiterVerification');
const jwt = require("jsonwebtoken");
const verifyEmailToken = async (req, res) => {
  const token = req.query.token;
  const verificationResult = verifyToken(token);
  if (verificationResult.valid) {
    const email = jwt.decode(token).email;
    await recuriterProfile.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: { verified: true },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Email verified successfully ! You can now " });
  } else {
    res
      .status(400)
      .json({ message: `Invalid Token ${verificationResult.error}` });
  }
};
const resendMail = async (req,res) =>{
  // email fullName
  const {email,fullName} = req.query;
  //console.log(email,fullName)
  try{
    await sendEmail(email,fullName);
    res.status(200).json({message : 'Email Sent'})
  }catch(error){
    return res.status(500).json({message : error.message})
  }
  
}

module.exports = {
  verifyEmailToken,
  resendMail
};
