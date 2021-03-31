//Login/ Register Post requests

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validators = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
    //Validate Inputs meets requirments
    const {error} = validators.registerValidation(req.body);
    if(error){
        return res.status(400).send(error);
    }

    //Check if user not exists
    const emailExists = await User.findOne({email : req.body.email});
    if(emailExists){
        return res.status(400).send('Email already exists');
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user using inputs
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    //Save the user in database
    try{
        const savedUser = await user.save();
        res.json({user: savedUser._id});
    }
    catch(err){
        res.json({msg: err});
    }

});


router.post('/login', async (req, res) => {
    //Validate inputs
    const {error} = validators.loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //check if user exist
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return res.status(400).send("Email or Password is wrong");
    }

    //compare password with the hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send('Email or Password is Wrong');
    }

    //create and assign token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
});

module.exports = router;