const express = require('express');

const authconroller=require('../controllers/auth.controller');
const router=express.Router();

 /* Post=> api/auth/register */
 router.post('/register', authconroller.registerUser);

 module.exports = router;