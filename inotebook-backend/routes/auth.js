const express = require('express');
const router = express.Router();
const userValidator = require('../Validators/userValidator');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/', userValidator, async (req, res) => {
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
        return res.status(200).json({ message: 'User created successfully', user });
    }catch (err) {
        console.error(err);
        if (err.code === 11000 && err.keyValue) {
            return res.status(500).json({ message: `${Object.keys(err.keyValue)} already exists` });
        } else {
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

module.exports=router;