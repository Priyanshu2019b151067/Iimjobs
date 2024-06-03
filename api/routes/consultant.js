const express = require('express');
const router  = express.Router();
const {getall,createConsultant} = require('../controllers/consultant')

router.get('/all',getall);
router.post('/create',createConsultant);
module.exports = router;