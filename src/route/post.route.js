const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
router.post('/create', async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Authentication token is missing'
        });
    }
    try {
      const decoded=  jwt.verify(token, process.env.JWT_SECRET, async )
            const user = await userModel.findById({ _id: decoded.id });
            console.log('User from token:', user);

        
    } catch (e) {
        return res.status(401).json({
            message: 'Invalid authentication token'
        });
    }

    console.log('Decoded token:', decoded);


console.log('Received cookie:', token);
return res.json({
    message: 'Data received successfully',
    data: data
});
});


module.exports = router;