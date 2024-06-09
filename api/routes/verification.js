const express = require('express');
const router = express.Router();
const {verifyEmailToken,resendMail,forgetMail,resetPass} = require('../controllers/verification')

router.get('/verify-email',verifyEmailToken);
router.get('/resend-email',resendMail);
router.post('/forget-password',forgetMail);
router.post('/reset-password',resetPass);
module.exports = router