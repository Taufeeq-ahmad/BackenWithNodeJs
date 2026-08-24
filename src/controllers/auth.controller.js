const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');

async function registerUser(req,res){
    const {name,email,password}=req.body;


    try{
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: 'User already exists',
            })
        }
        const user=await userModel.create({
            name,email,password
        })
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token', token, { httpOnly: true });
        return res.status(201).json({
            message: 'User registered successfully',
            data: user,
        })
    }catch(error){
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        })
    }

}

module.exports={registerUser};