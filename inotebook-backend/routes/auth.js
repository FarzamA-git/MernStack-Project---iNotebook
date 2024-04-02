const express = require('express');
const router = express.Router();
const {userValidator,loginValidator} = require('../Validators/userValidator');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const fetchUser = require('../Middleware/fetchUser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET_KEY='mynameisFarzam';




router.post('/createUser', userValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }        
    try{
        const salt=await bcrypt.genSalt(10);        
        const user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,salt)
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        return res.status(200).json({authToken});
    }catch (err) {
        console.error(err);
        if (err.code === 11000 && err.keyValue) {
            return res.status(500).json({ message: `${Object.keys(err.keyValue)} already exists` });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    }
});


router.post('/login', loginValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Please enter correct credentials"});
        }
        let passwordComp= await bcrypt.compare(password,user.password);
        if(!passwordComp){
            return res.status(400).json({message:"Please enter correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        return res.status(200).json({authToken});

    }catch{
        return res.status(500).json({ message:"Internal Server Error" });
    }
});

router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user=await User.findById(userID).select('-password');
        return res.send(user);
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }


});
module.exports=router;