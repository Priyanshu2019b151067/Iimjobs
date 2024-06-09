const { verifyToken } = require("../mail/recruiterVerification");
const recuriterProfile = require("../models/recuriter");
const { sendEmail, sendForget } = require("../mail/recruiterVerification");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
const resendMail = async (req, res) => {
  // email fullName
  const { email, fullName } = req.query;
  //console.log(email,fullName)
  try {
    await sendEmail(email, fullName);
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const forgetMail = async (req, res) => {
  // email
  const { email } = req.body;
  console.log(email);
  try {
    await sendForget(email);
    res.status(200).json({ message: "Forget Mail send." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const resetPass = async (req, res) => {
  const { email, token, password } = req.body;
 
  const verificationResult = verifyToken(token);
  if (verificationResult.valid) {
    const recruiter = await recuriterProfile.findOne({
      email: email,
    });
    //console.log(recruiter.password)
    const match = await bcrypt.compare(password, recruiter.password);
    //console.log('This is match ',match);
    if (match) {
      return res
        .status(404)
        .json({ message: "new password cannot be equal to new password." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    await recuriterProfile.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: { password: hashPassword },
      },
      { new: true }
    );
    res.status(200).json({ message: "Password set" });
  } else {
    res
      .status(400)
      .json({ message: `Invalid Token ${verificationResult.error}` });
  }
};

module.exports = {
  verifyEmailToken,
  resendMail,
  forgetMail,
  resetPass,
};
