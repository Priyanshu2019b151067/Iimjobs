const express = require('express');
const router  = express.Router();
const {registerRecuriter,loginRecuriter,getCompanyNConsultancy} = require('../controllers/recuiter');
router.post('/register',registerRecuriter);
router.post('/login',loginRecuriter);
router.get('/all',getCompanyNConsultancy);
module.exports = router;