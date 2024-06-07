const express = require('express');
const router = express.Router();
const {verifyEmailToken} = require('../controllers/verification')

router.get('/verify-email',verifyEmailToken);
module.exports = router