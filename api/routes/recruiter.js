const express = require('express');
const router  = express.Router();
const {registerRecuriter,loginRecuriter} = require('../controllers/recuiter');
router.post('/register',registerRecuriter);
router.post('/login',loginRecuriter);
module.exports = router;