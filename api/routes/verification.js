const express = require('express');
const router = express.Router();
const {verifyEmailToken,resendMail} = require('../controllers/verification')

router.get('/verify-email',verifyEmailToken);
router.get('/resend-email',resendMail);
module.exports = router