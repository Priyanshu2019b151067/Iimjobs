const {verifyToken} = require('../mail/recruiterVerification');
const verifyEmailToken = (req,res) =>{
    const token = req.query.token;
    const verificationResult = verifyToken(token);
    if(verificationResult.valid){
        res.status(200).json({message : 'Email verified successfully ! You can now '})
    }else{
        res.status(400).json({message : `Invalid Token ${verificationResult.error}`})
    }
}

module.exports = {
    verifyEmailToken
}