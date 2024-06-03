const express = require('express');
const router  = express.Router();
const {getall,createCompany} = require('../controllers/company')

router.get('/all',getall);
router.post('/create',createCompany);
module.exports = router;